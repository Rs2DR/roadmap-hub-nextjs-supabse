'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createRoadmap } from '@/actions/roadmap/createRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { DASHBOARD_ROUTES } from '@/constants/routes';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';
import type { Roadmap } from '@/shcemas/RoadmapSchema';

export const useCreateRoadmap = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ManageMyRoadmapInput) => createRoadmap(data),

    onMutate: async (newRoadmap) => {
      await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

      const previousRoadmaps = queryClient.getQueryData([MY_ROADMAPS_KEY]) as {
        roadmaps: Roadmap[];
      };

      const optimisticRoadmap: Roadmap = {
        id: crypto.randomUUID(),
        ...newRoadmap,
        is_public: false,
        created_at: Date.now().toString(),
        updated_at: Date.now().toString(),
      };

      queryClient.setQueryData(
        [MY_ROADMAPS_KEY],
        (old: { roadmaps: Roadmap[] } | undefined) => ({
          roadmaps: [optimisticRoadmap, ...(old?.roadmaps ?? [])],
        }),
      );

      return { previousRoadmaps };
    },

    onSuccess: ({ success, data: { id } }) => {
      if (!success) return;

      toast.success('Roadmap успешно создана');

      queryClient.invalidateQueries({
        queryKey: [MY_ROADMAPS_KEY],
      });

      router.push(`${DASHBOARD_ROUTES.MY_ROADMAPS}/${id}`);
    },

    onError: ({ message }, _variables, context) => {
      if (context?.previousRoadmaps) {
        queryClient.setQueryData([MY_ROADMAPS_KEY], context.previousRoadmaps);
      }

      toast.error(message);
    },
  });
};
