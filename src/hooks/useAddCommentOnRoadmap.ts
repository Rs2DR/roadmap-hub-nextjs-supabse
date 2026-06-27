'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { addCommentOnRoadmap } from '@/actions/roadmap/addCommentOnRoadmap';
import { ROADMAP_COMMENTS_KEY } from '@/constants/queries';
import { getUserQueryOptions } from '@/queries/getUserQueryOptions';
import { handleActionError } from '@/utils/handleActionError';

import type { PublicComment } from '@/schemas/PublicCommentSchema';

export const useAddCommentOnRoadmap = ({
  roadmapId,
}: {
  roadmapId: string;
}) => {
  const queryClient = useQueryClient();
  const queryKey = [ROADMAP_COMMENTS_KEY, roadmapId];

  const { data: user } = useSuspenseQuery(getUserQueryOptions());

  return useMutation(
    mutationOptions(addCommentOnRoadmap, {
      onMutate: async ({ content }) => {
        await queryClient.cancelQueries({ queryKey });

        const previousComments =
          queryClient.getQueryData<PublicComment[]>(queryKey) ?? [];

        const optimisticComment: PublicComment = {
          id: crypto.randomUUID(),
          roadmapId: roadmapId,
          userId: user.id,
          content: content.trim(),
          createdAt: new Date().toISOString(),
          firstName: user.user_metadata?.firstName ?? 'Я',
          avatar: user.user_metadata?.avatar ?? '',
        };

        queryClient.setQueryData<PublicComment[]>(queryKey, [
          optimisticComment,
          ...previousComments,
        ]);

        return { previousComments };
      },

      onError: (error, _variables, context) => {
        if (context?.previousComments) {
          queryClient.setQueryData(queryKey, context.previousComments);
        }
        toast.error(handleActionError(error));
      },

      onSuccess: () => {
        toast.success('Комментарий добавлен');
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }),
  );
};
