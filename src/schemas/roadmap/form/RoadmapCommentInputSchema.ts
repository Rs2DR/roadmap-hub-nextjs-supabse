import { z } from 'zod';

import { UuidSchema } from '@/schemas/common';

export const RoadmapCommentInputSchema = z.object({
  roadmapId: UuidSchema,
  content: z
    .string('Некорректный формат сообщения')
    .nonempty('Комментарий не может быть пустым')
    .max(400, { error: ({ maximum }) => `Максимум ${maximum} символов` })
    .trim(),
});

export type RoadmapCommentInput = z.infer<typeof RoadmapCommentInputSchema>;
