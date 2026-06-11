'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateRoadmapVisibility } from '@/actions/roadmap/updateRoadmapVisibility';
import { MY_ROADMAPS_KEY } from '@/constants/queries';

import type { Roadmap } from '@/shcemas/RoadmapSchema';
import type { UpdateRoadmapVisibilityInput } from '@/shcemas/UpdateRoadmapVisibilitySchema';

export const useUpdateRoadmapVisibility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoadmapVisibilityInput) =>
      updateRoadmapVisibility(data),

    onMutate: async ({ id, isPublic }) => {
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
              roadmap.id === id
                ? {
                    ...roadmap,
                    isPublic,
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

    onSuccess: ({ success, isPublic }, variables) => {
      if (!success) return;

      queryClient.setQueryData(
        [MY_ROADMAPS_KEY],
        (old: { roadmaps: Roadmap[] } | undefined) => {
          if (!old) return old;

          return {
            roadmaps: old.roadmaps.map((roadmap) =>
              roadmap.id === variables.id
                ? {
                    ...roadmap,
                    isPublic,
                    isOptimistic: false,
                  }
                : roadmap,
            ),
          };
        },
      );

      toast.success('Видимость обновлена');
    },
  });
};
