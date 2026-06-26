import { CommentBaseSchema } from '@/shcemas/CommentBaseSchema';

import type z from 'zod';

export const PublicCommentSchema = CommentBaseSchema.transform(
  ({ created_at, first_name, user_id, roadmap_id, ...rest }) => ({
    roadmapId: roadmap_id,
    userId: user_id,
    createdAt: created_at,
    firstName: first_name ?? 'Аноним',
    ...rest,
  }),
);

export type PublicComment = z.infer<typeof PublicCommentSchema>;
