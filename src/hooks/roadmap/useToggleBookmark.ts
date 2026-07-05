'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toggleBookmarkAction } from '@/actions/roadmap';
import {
  ROADMAPS_KEY,
  BOOKMARKED_ROADMAPS_KEY,
  ROADMAP_VIEW_KEY,
} from '@/constants/queries';
import { handleActionError } from '@/utils/error';
import { asArray } from '@/utils/share';

import type { PublicRoadmapGraph, PublicRoadmapInfo } from '@/schemas/roadmap';

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

        queryClient.setQueryData<PublicRoadmapGraph>(
          [ROADMAP_VIEW_KEY, id],
          (old) => (old ? { ...old, isBookmarked: !old.isBookmarked } : old),
        );

        queryClient.setQueriesData<PublicRoadmapInfo[]>(
          { queryKey: [ROADMAPS_KEY] },
          (old) =>
            asArray(old).map((r) =>
              r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r,
            ),
        );

        queryClient.setQueriesData<PublicRoadmapInfo[]>(
          { queryKey: [BOOKMARKED_ROADMAPS_KEY] },
          (old) => {
            const arr = asArray(old);

            const exists = arr.some((r) => r.id === id);

            if (exists) {
              return arr.filter((r) => r.id !== id);
            }

            const fromRoadmap = queryClient
              .getQueriesData<PublicRoadmapInfo[]>({
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
