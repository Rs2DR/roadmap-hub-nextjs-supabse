import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleBookmarkAction } from '@/actions/roadmap/toggleBookmark';
import { ROADMAPS } from '@/constants/queries';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(toggleBookmarkAction, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: [ROADMAPS] });
        const previousQueries = queryClient.getQueriesData<PublicRoadmap[]>({
          queryKey: [ROADMAPS],
        });

        queryClient.setQueriesData<PublicRoadmap[]>(
          { queryKey: [ROADMAPS] },
          (oldData) => {
            if (!oldData) return oldData;
            return oldData.map((item) =>
              item.id === id
                ? { ...item, isBookmarked: !item.isBookmarked }
                : item,
            );
          },
        );

        return { previousQueries };
      },
      onError: (_error, _vars, context) => {
        if (context?.previousQueries) {
          context.previousQueries.forEach(([key, data]) =>
            queryClient.setQueryData(key, data),
          );
        }
      },
    }),
  );
};
