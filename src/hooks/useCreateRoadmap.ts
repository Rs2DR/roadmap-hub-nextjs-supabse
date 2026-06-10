'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createRoadmap } from '@/actions/roadmap/createRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';

export const useCreateRoadmap = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ManageMyRoadmapInput) => createRoadmap(data),
    onMutate: async (newRoadmap) => {
      await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

      const previousRoadmaps = queryClient.getQueryData([MY_ROADMAPS_KEY]);

      const optimisticRoadmap = {
        id: crypto.randomUUID(),
        ...newRoadmap,
        isOptimistic: true,
      };

      queryClient.setQueryData([MY_ROADMAPS_KEY], (old: unknown[] = []) => [
        optimisticRoadmap,
        ...old,
      ]);

      return { previousRoadmaps };
    },
    onSuccess: ({ success, data }) => {
      if (success) {
        toast.info('Roadmap успешно создана');
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
