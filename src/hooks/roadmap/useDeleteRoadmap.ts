'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteRoadmap } from '@/actions/roadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/error';

import type { MyRoadmapInfo } from '@/schemas/roadmap';

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient();
  const queryKey = [MY_ROADMAPS_KEY];

  return useMutation(
    mutationOptions(deleteRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey });

        const previousRoadmaps =
          queryClient.getQueryData<MyRoadmapInfo[]>(queryKey);

        queryClient.setQueryData<MyRoadmapInfo[]>(queryKey, (oldRoadmaps) => {
          if (!oldRoadmaps) return oldRoadmaps;

          return oldRoadmaps.filter((roadmap) => roadmap.id !== id);
        });

        return { previousRoadmaps };
      },

      onError: (error, _vars, context) => {
        if (context?.previousRoadmaps) {
          queryClient.setQueryData<MyRoadmapInfo[]>(
            queryKey,
            context.previousRoadmaps,
          );
        }

        toast.error(handleActionError(error));
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey,
        });

        toast.success('Roadmap удалён');
      },
    }),
  );
};
