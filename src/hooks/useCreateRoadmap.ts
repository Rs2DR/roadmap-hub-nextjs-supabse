'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRoadmap } from '@/actions/roadmap/createRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

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

        const previousRoadmaps = queryClient.getQueryData<Roadmap[]>([
          MY_ROADMAPS_KEY,
        ]);

        const optimisticRoadmap = createOptimisticRoadmap(newRoadmap);

        queryClient.setQueryData<Roadmap[]>([MY_ROADMAPS_KEY], (oldRoadmap) => [
          optimisticRoadmap,
          ...(oldRoadmap ?? []),
        ]);

        return { previousRoadmaps };
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [MY_ROADMAPS_KEY],
        });

        toast.success('Roadmap успешно создана');
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
    }),
  );
};
