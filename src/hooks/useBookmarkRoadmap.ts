import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { bookmarkRoadmap } from '@/actions/roadmap/bookmarkRoadmap';
import { ROADMAPS } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

export const useBookmarkRoadmap = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(bookmarkRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS, id] });
        const previousData = queryClient.getQueryData<PublicRoadmap>([
          ROADMAPS,
          id,
        ]);

        queryClient.setQueryData<PublicRoadmap>(
          [ROADMAPS, id],
          (oldRoadmap) => {
            if (!oldRoadmap) return oldRoadmap;
            return { ...oldRoadmap, isBookmarked: true };
          },
        );

        return { previousData };
      },
      onError: (error, vars, context) => {
        if (context?.previousData)
          queryClient.setQueryData<PublicRoadmap>(
            [ROADMAPS, vars.id],
            context.previousData,
          );

        toast.error(handleActionError(error));
      },
    }),
  );
};
