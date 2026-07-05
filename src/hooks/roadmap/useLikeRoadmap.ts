'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { likeRoadmap } from '@/actions/roadmap';
import { ROADMAP_VIEW_KEY, ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/error';

import type { PublicRoadmapGraph } from '@/schemas/roadmap';

export const useLikeRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(likeRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS_KEY] });
        await queryClient.cancelQueries({ queryKey: [ROADMAP_VIEW_KEY, id] });

        const previousView = queryClient.getQueryData<PublicRoadmapGraph>([
          ROADMAP_VIEW_KEY,
          id,
        ]);

        const toggle = (r: PublicRoadmapGraph): PublicRoadmapGraph => {
          const isLiked = !r.isLiked;

          return {
            ...r,
            isLiked,
          };
        };

        queryClient.setQueryData<PublicRoadmapGraph>(
          [ROADMAP_VIEW_KEY, id],
          (old) => (old ? toggle(old) : old),
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
    }),
  );
};
