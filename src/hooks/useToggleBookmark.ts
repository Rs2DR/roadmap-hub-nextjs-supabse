'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toggleBookmarkAction } from '@/actions/roadmap/toggleBookmark';
import { ROADMAPS_KEY, BOOKMARKED_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(toggleBookmarkAction, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS_KEY] });
        await queryClient.cancelQueries({
          queryKey: [BOOKMARKED_ROADMAPS_KEY],
        });

        const detailedKey = [ROADMAPS_KEY, id];
        const previousPublicRoadmap =
          queryClient.getQueryData<PublicRoadmap>(detailedKey);

        if (previousPublicRoadmap) {
          queryClient.setQueryData<PublicRoadmap>(detailedKey, {
            ...previousPublicRoadmap,
            isBookmarked: !previousPublicRoadmap.isBookmarked,
          });
        }

        const previousQueries = queryClient.getQueriesData<PublicRoadmap[]>({
          queryKey: [ROADMAPS_KEY],
        });

        previousQueries.forEach(([queryKey, oldRoadmaps]) => {
          if (queryKey.length === 2 && queryKey[1] === id) return;
          if (!oldRoadmaps) return;

          queryClient.setQueryData<PublicRoadmap[]>(
            queryKey,
            oldRoadmaps.map((roadmap) =>
              roadmap.id === id
                ? { ...roadmap, isBookmarked: !roadmap.isBookmarked }
                : roadmap,
            ),
          );
        });

        const previousBookmarkedQueries = queryClient.getQueriesData<
          PublicRoadmap[]
        >({
          queryKey: [BOOKMARKED_ROADMAPS_KEY],
        });

        previousBookmarkedQueries.forEach(([queryKey, oldBookmarked]) => {
          if (!oldBookmarked) return;

          const exists = oldBookmarked.find((i) => i.id === id);

          if (exists) {
            queryClient.setQueryData<PublicRoadmap[]>(
              queryKey,
              oldBookmarked.filter((i) => i.id !== id),
            );
          } else {
            const roadmap =
              previousQueries
                .flatMap(([, d]) => d ?? [])
                .find((i) => i.id === id) || previousPublicRoadmap;

            if (roadmap) {
              queryClient.setQueryData<PublicRoadmap[]>(queryKey, [
                ...oldBookmarked,
                { ...roadmap, isBookmarked: true },
              ]);
            }
          }
        });
        return {
          previousPublicRoadmap,
          previousQueries,
          previousBookmarkedQueries,
        };
      },

      onError: (error, { id }, context) => {
        if (context?.previousPublicRoadmap) {
          queryClient.setQueryData(
            [ROADMAPS_KEY, id],
            context.previousPublicRoadmap,
          );
        }

        if (context?.previousQueries) {
          context.previousQueries.forEach(([queryKey, previousData]) => {
            queryClient.setQueryData(queryKey, previousData);
          });
        }

        if (context?.previousBookmarkedQueries) {
          context.previousBookmarkedQueries.forEach(
            ([queryKey, previousData]) => {
              queryClient.setQueryData(queryKey, previousData);
            },
          );
        }

        toast.error(handleActionError(error));
      },

      onSuccess: ({ isBookmarked }, { id }) => {
        queryClient.setQueryData<PublicRoadmap>([ROADMAPS_KEY, id], (old) => {
          if (!old || old.isBookmarked === isBookmarked) return old;
          return { ...old, isBookmarked };
        });

        queryClient
          .getQueriesData<PublicRoadmap[]>({ queryKey: [ROADMAPS_KEY] })
          .forEach(([queryKey, oldRoadmaps]) => {
            if (queryKey.length === 2 && queryKey[1] === id) return;
            if (!oldRoadmaps) return;

            queryClient.setQueryData<PublicRoadmap[]>(
              queryKey,
              oldRoadmaps.map((m) =>
                m.id === id ? { ...m, isBookmarked } : m,
              ),
            );
          });

        queryClient.invalidateQueries({
          queryKey: [BOOKMARKED_ROADMAPS_KEY],
        });
      },
    }),
  );
};
