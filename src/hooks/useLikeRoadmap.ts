'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { likeRoadmap } from '@/actions/roadmap/likeRoadmap';
import { MY_ROADMAPS_KEY, ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

export const useLikeRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(likeRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS_KEY] });

        const detailedKey = [ROADMAPS_KEY, id];
        const previousPublicRoadmap =
          queryClient.getQueryData<PublicRoadmap>(detailedKey);

        if (previousPublicRoadmap) {
          queryClient.setQueryData<PublicRoadmap>(detailedKey, {
            ...previousPublicRoadmap,
            isLiked: !previousPublicRoadmap.isLiked,
            likesCount:
              (previousPublicRoadmap.likesCount ?? 0) +
              (!previousPublicRoadmap.isLiked ? 1 : -1),
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
                ? {
                    ...roadmap,
                    isLiked: !roadmap.isLiked,
                    likesCount:
                      (roadmap.likesCount ?? 0) + (!roadmap.isLiked ? 1 : -1),
                  }
                : roadmap,
            ),
          );
        });

        return { previousPublicRoadmap, previousQueries };
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

        toast.error(handleActionError(error));
      },

      onSuccess: ({ isLiked }, { id }) => {
        queryClient.setQueryData<PublicRoadmap>([ROADMAPS_KEY, id], (old) => {
          if (!old) return old;

          if (old.isLiked === isLiked) return old;

          return {
            ...old,
            isLiked,
            likesCount: (old.likesCount ?? 0) + (isLiked ? 1 : -1),
          };
        });

        queryClient
          .getQueriesData<PublicRoadmap[]>({ queryKey: [ROADMAPS_KEY] })
          .forEach(([queryKey, oldRoadmaps]) => {
            if (queryKey.length === 2 && queryKey[1] === id) return;
            if (!oldRoadmaps) return;

            queryClient.setQueryData<PublicRoadmap[]>(
              queryKey,
              oldRoadmaps.map((m) =>
                m.id === id
                  ? {
                      ...m,
                      isLiked,
                      likesCount: (m.likesCount ?? 0) + (isLiked ? 1 : -1),
                    }
                  : m,
              ),
            );
          });

        queryClient.invalidateQueries({ queryKey: [MY_ROADMAPS_KEY] });
      },
    }),
  );
};
