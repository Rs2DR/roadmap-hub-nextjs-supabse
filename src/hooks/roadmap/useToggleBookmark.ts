'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toggleBookmarkAction } from '@/actions/roadmap/toggleBookmark';
import {
  ROADMAPS_KEY,
  BOOKMARKED_ROADMAPS_KEY,
  ROADMAP_VIEW_KEY,
} from '@/constants/queries';
import { handleActionError } from '@/utils/error/handleActionError';
import { asArray } from '@/utils/share/asArray';

import type { PublicRoadmap } from '@/schemas/PublicRoadmapSchema';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(toggleBookmarkAction, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS_KEY] });
        await queryClient.cancelQueries({
          queryKey: [BOOKMARKED_ROADMAPS_KEY],
        });
        await queryClient.cancelQueries({ queryKey: [ROADMAP_VIEW_KEY, id] });

        const toggle = (r: PublicRoadmap): PublicRoadmap => ({
          ...r,
          isBookmarked: !r.isBookmarked,
        });

        queryClient.setQueryData<PublicRoadmap>(
          [ROADMAP_VIEW_KEY, id],
          (old) => (old ? toggle(old) : old),
        );

        queryClient.setQueriesData<PublicRoadmap[]>(
          { queryKey: [ROADMAPS_KEY] },
          (old) => asArray(old).map((r) => (r.id === id ? toggle(r) : r)),
        );

        queryClient.setQueriesData<PublicRoadmap[]>(
          { queryKey: [BOOKMARKED_ROADMAPS_KEY] },
          (old) => {
            const arr = asArray(old);

            const exists = arr.some((r) => r.id === id);

            if (exists) {
              return arr.filter((r) => r.id !== id);
            }

            const fromRoadmap = queryClient
              .getQueriesData<PublicRoadmap[]>({
                queryKey: [ROADMAPS_KEY],
              })
              .flatMap(([, d]) => asArray(d))
              .find((r) => r.id === id);

            if (!fromRoadmap) return arr;

            return [...arr, { ...fromRoadmap, isBookmarked: true }];
          },
        );
      },

      onError: (error) => {
        toast.error(handleActionError(error));

        queryClient.invalidateQueries({ queryKey: [ROADMAP_VIEW_KEY] });
        queryClient.invalidateQueries({ queryKey: [ROADMAPS_KEY] });
        queryClient.invalidateQueries({ queryKey: [BOOKMARKED_ROADMAPS_KEY] });
      },
    }),
  );
};
