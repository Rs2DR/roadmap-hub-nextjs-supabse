'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRoadmap } from '@/actions/roadmap/createRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';
import type { Roadmap } from '@/shcemas/RoadmapSchema';

const createOptimisticRoadmap = (newRoadmap: ManageMyRoadmapInput): Roadmap => {
  const timestamp = Date.now().toString();

  return {
    id: crypto.randomUUID(),
    ...newRoadmap,
    isPublic: false,
    likesCount: 0,
    commentsCount: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(createRoadmap, {
      onMutate: async (newRoadmap) => {
        await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

        const previousRoadmaps = queryClient.getQueryData([
          MY_ROADMAPS_KEY,
        ]) as {
          roadmaps: Roadmap[];
        };

        const optimisticRoadmap = createOptimisticRoadmap(newRoadmap);

        queryClient.setQueryData(
          [MY_ROADMAPS_KEY],
          (old: { roadmaps: Roadmap[] } | undefined) => ({
            roadmaps: [optimisticRoadmap, ...(old?.roadmaps ?? [])],
          }),
        );

        return { previousRoadmaps };
      },

      onSuccess: () => {
        toast.success('Roadmap успешно создана');

        queryClient.invalidateQueries({
          queryKey: [MY_ROADMAPS_KEY],
        });
      },

      onError: ({ message }, _vars, context) => {
        if (context?.previousRoadmaps) {
          queryClient.setQueryData([MY_ROADMAPS_KEY], context.previousRoadmaps);
        }

        toast.error(message);
      },
    }),
  );
};
