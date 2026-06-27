'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { publishRoadmap } from '@/actions/roadmap/publishRoadmap';
import { MY_ROADMAPS_KEY, ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { MyRoadmap } from '@/schemas/MyRoadmapSchema';

export const usePublishRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(publishRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

        const previousMyRoadmaps = queryClient.getQueryData<MyRoadmap[]>([
          MY_ROADMAPS_KEY,
        ]);

        queryClient.setQueryData<MyRoadmap[]>(
          [MY_ROADMAPS_KEY],
          (oldRoadmaps) =>
            oldRoadmaps?.map((roadmap) =>
              roadmap.id === id ? { ...roadmap, isPublic: true } : roadmap,
            ) ?? [],
        );

        return { previousMyRoadmaps };
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [ROADMAPS_KEY],
        });

        toast.success('Roadmap успешно опубликована');
      },

      onError: (error, _vars, context) => {
        if (context?.previousMyRoadmaps) {
          queryClient.setQueryData<MyRoadmap[]>(
            [MY_ROADMAPS_KEY],
            context.previousMyRoadmaps,
          );
        }

        toast.error(handleActionError(error));
      },
    }),
  );
};
