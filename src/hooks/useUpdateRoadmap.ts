'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateRoadmap } from '@/actions/roadmap/updateRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

import type { Roadmap } from '@/shcemas/RoadmapSchema';
import type { UpdateRoadmapInput } from '@/shcemas/UpdateRoadmapSchema';

export const useUpdateRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoadmapInput) => updateRoadmap(data),

    onMutate: async (updatedRoadmap) => {
      await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

      const previousRoadmaps = queryClient.getQueryData([MY_ROADMAPS_KEY]) as {
        roadmaps: Roadmap[];
      };

      queryClient.setQueryData(
        [MY_ROADMAPS_KEY],
        (old: { roadmaps: Roadmap[] } | undefined) => {
          if (!old) return old;

          return {
            roadmaps: old.roadmaps.map((roadmap) =>
              roadmap.id === updatedRoadmap.id
                ? {
                    ...roadmap,
                    ...updatedRoadmap,
                    updated_at: new Date().toISOString(),
                    isOptimistic: true,
                  }
                : roadmap,
            ),
          };
        },
      );

      return { previousRoadmaps };
    },

    onError: (error, _vars, context) => {
      if (context?.previousRoadmaps) {
        queryClient.setQueryData([MY_ROADMAPS_KEY], context.previousRoadmaps);
      }

      toast.error(error.message);
    },

    onSuccess: ({ success, data }) => {
      if (!success) return;

      toast.success('Roadmap успешно обновлена');

      queryClient.setQueryData(
        [MY_ROADMAPS_KEY],
        (old: { roadmaps: Roadmap[] } | undefined) => {
          if (!old) return old;

          return {
            roadmaps: old.roadmaps.map((roadmap) =>
              roadmap.id === data.id ? data : roadmap,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: [MY_ROADMAPS_KEY],
      });
    },
  });
};
