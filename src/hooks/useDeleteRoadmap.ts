'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteRoadmap } from '@/actions/roadmap/deleteRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(deleteRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

        const previousRoadmaps = queryClient.getQueryData<Roadmap[]>([
          MY_ROADMAPS_KEY,
        ]);

        queryClient.setQueryData<Roadmap[]>(
          [MY_ROADMAPS_KEY],
          (oldRoadmaps) => {
            if (!oldRoadmaps) return oldRoadmaps;

            return oldRoadmaps.filter((roadmap) => roadmap.id !== id);
          },
        );

        return { previousRoadmaps };
      },

      onError: (error, _vars, context) => {
        if (context?.previousRoadmaps) {
          queryClient.setQueryData<Roadmap[]>(
            [MY_ROADMAPS_KEY],
            context.previousRoadmaps,
          );
        }

        handleActionError(error);
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [MY_ROADMAPS_KEY],
        });

        toast.success('Roadmap удалён');
      },
    }),
  );
};
