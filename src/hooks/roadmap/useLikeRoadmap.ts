'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { likeRoadmap } from '@/actions/roadmap/likeRoadmap';
import {
  ROADMAP_VIEW_KEY,
  ROADMAPS_KEY,
  MY_ROADMAPS_KEY,
} from '@/constants/queries';
import { handleActionError } from '@/utils/error/handleActionError';
import { asArray } from '@/utils/share/asArray';

import type { PublicRoadmap } from '@/schemas/PublicRoadmapSchema';

export const useLikeRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(likeRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS_KEY] });
        await queryClient.cancelQueries({ queryKey: [ROADMAP_VIEW_KEY, id] });

        const previousView = queryClient.getQueryData<PublicRoadmap>([
          ROADMAP_VIEW_KEY,
          id,
        ]);

        const toggle = (r: PublicRoadmap): PublicRoadmap => {
          const isLiked = !r.isLiked;

          return {
            ...r,
            isLiked,
            likesCount: (r.likesCount ?? 0) + (isLiked ? 1 : -1),
          };
        };

        queryClient.setQueryData<PublicRoadmap>(
          [ROADMAP_VIEW_KEY, id],
          (old) => (old ? toggle(old) : old),
        );

        queryClient.setQueriesData<PublicRoadmap[]>(
          { queryKey: [ROADMAPS_KEY] },
          (old) => {
            if (!old) return old;

            return asArray(old).map((r) => (r.id === id ? toggle(r) : r));
          },
        );

        return { previousView };
      },

      onError: (error, { id }, context) => {
        toast.error(handleActionError(error));

        if (context?.previousView) {
          queryClient.setQueryData(
            [ROADMAP_VIEW_KEY, id],
            context.previousView,
          );
        }
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [MY_ROADMAPS_KEY],
        });
      },
    }),
  );
};
