'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateRoadmapInfo } from '@/actions/roadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/error';

import type { MyRoadmapInfo } from '@/schemas/roadmap';

export const useUpdateRoadmapInfo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(updateRoadmapInfo, {
      onMutate: async (updatedRoadmap) => {
        await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

        const previousRoadmaps = queryClient.getQueryData<MyRoadmapInfo[]>([
          MY_ROADMAPS_KEY,
        ]);

        queryClient.setQueryData<MyRoadmapInfo[]>(
          [MY_ROADMAPS_KEY],
          (oldRoadmaps) => {
            if (!oldRoadmaps) return oldRoadmaps;

            return oldRoadmaps.map((roadmap) =>
              roadmap.id === updatedRoadmap.id
                ? {
                    ...roadmap,
                    ...updatedRoadmap,
                    updated_at: new Date().toISOString(),
                    isOptimistic: true,
                  }
                : roadmap,
            );
          },
        );

        return { previousRoadmaps };
      },

      onError: (error, _vars, context) => {
        if (context?.previousRoadmaps) {
          queryClient.setQueryData<MyRoadmapInfo[]>(
            [MY_ROADMAPS_KEY],
            context.previousRoadmaps,
          );
        }

        toast.error(handleActionError(error));
      },

      onSuccess: (data) => {
        toast.success('Roadmap успешно обновлена');

        queryClient.setQueryData<MyRoadmapInfo[]>(
          [MY_ROADMAPS_KEY],
          (oldRoadmaps) => {
            if (!oldRoadmaps) return oldRoadmaps;

            return oldRoadmaps.map((roadmap) =>
              roadmap.id === data.id ? data : roadmap,
            );
          },
        );

        queryClient.invalidateQueries({
          queryKey: [MY_ROADMAPS_KEY],
        });
      },
    }),
  );
};
