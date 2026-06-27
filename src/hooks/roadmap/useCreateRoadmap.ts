'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createRoadmap } from '@/actions/roadmap/createRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/error/handleActionError';

import type { MyRoadmap } from '@/schemas/MyRoadmapSchema';
import type { ManageMyRoadmapInput } from '@/schemas/roadmap/ManageMyRoadmapSchema';

const createOptimisticRoadmap = (
  newRoadmap: ManageMyRoadmapInput,
): MyRoadmap => {
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
  const queryKey = [MY_ROADMAPS_KEY];

  return useMutation(
    mutationOptions(createRoadmap, {
      onMutate: async (newRoadmap) => {
        await queryClient.cancelQueries({ queryKey });

        const previousRoadmaps =
          queryClient.getQueryData<MyRoadmap[]>(queryKey);

        const optimisticRoadmap = createOptimisticRoadmap(newRoadmap);

        queryClient.setQueryData<MyRoadmap[]>(queryKey, (oldRoadmap) => [
          optimisticRoadmap,
          ...(oldRoadmap ?? []),
        ]);

        return { previousRoadmaps };
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey,
        });

        toast.success('Roadmap успешно создана');
      },

      onError: (error, _vars, context) => {
        if (context?.previousRoadmaps) {
          queryClient.setQueryData<MyRoadmap[]>(
            queryKey,
            context.previousRoadmaps,
          );
        }

        toast.error(handleActionError(error));
      },
    }),
  );
};
