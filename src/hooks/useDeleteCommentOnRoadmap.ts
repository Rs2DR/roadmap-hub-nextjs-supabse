'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteCommentOnRoadmap } from '@/actions/roadmap/deleteCommentOnRoadmap';
import { ROADMAP_COMMENTS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { PublicComment } from '@/schemas/PublicCommentSchema';

export const useDeleteCommentOnRoadmap = ({
  roadmapId,
}: {
  roadmapId: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = [ROADMAP_COMMENTS_KEY, roadmapId];

  return useMutation(
    mutationOptions(deleteCommentOnRoadmap, {
      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey });

        const previousComments =
          queryClient.getQueryData<PublicComment[]>(queryKey);

        if (previousComments) {
          queryClient.setQueryData<PublicComment[]>(
            queryKey,
            previousComments.filter((comment) => comment.id !== id),
          );
        }

        return { previousComments };
      },

      onError: (error, _variables, context) => {
        if (context?.previousComments) {
          queryClient.setQueryData(queryKey, context.previousComments);
        }

        toast.error(handleActionError(error));
      },

      onSuccess: () => {
        toast.success('Комментарий удален');
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }),
  );
};
