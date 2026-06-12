'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteRoadmap } from '@/actions/roadmap/deleteRoadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

type DeleteRoadmapInput = {
  id: Roadmap['id'];
};

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteRoadmapInput) => deleteRoadmap(data),

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: [MY_ROADMAPS_KEY] });

      const previousRoadmaps = queryClient.getQueryData([MY_ROADMAPS_KEY]) as {
        roadmaps: Roadmap[];
      };

      queryClient.setQueryData(
        [MY_ROADMAPS_KEY],
        (old: { roadmaps: Roadmap[] } | undefined) => {
          if (!old) return old;

          return {
            roadmaps: old.roadmaps.filter((roadmap) => roadmap.id !== id),
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

    onSuccess: ({ success }) => {
      if (!success) return;

      queryClient.invalidateQueries({
        queryKey: [MY_ROADMAPS_KEY],
      });

      toast.success('Roadmap удалён');
    },
  });
};
