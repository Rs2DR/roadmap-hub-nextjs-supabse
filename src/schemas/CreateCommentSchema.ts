import { z } from 'zod';

import { RoadmapBaseSchema } from '@/schemas/RoadmapBaseSchema';

export const CreateCommentSchema = z.object({
  roadmapId: RoadmapBaseSchema.shape.id,
  content: z
    .string()
    .min(1, { message: 'Комментарий не может быть пустым' })
    .max(400, {
      message: 'Максимум 400 символов',
    })
    .trim(),
});

export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
