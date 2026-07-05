import z from 'zod';

import { ROADMAP_FILTER_OPTIONS } from '@/constants/form';
import { UuidSchema } from '@/schemas/common';

export const PublicRoadmapsInputSchema = z.object({
  search: z
    .string()
    .optional()
    .transform((val) => (val?.trim() === '' ? undefined : val?.trim())),
  orderBy: z
    .enum([
      ROADMAP_FILTER_OPTIONS.ORDER_BY.NEWEST,
      ROADMAP_FILTER_OPTIONS.ORDER_BY.OLDEST,
    ])
    .default(ROADMAP_FILTER_OPTIONS.ORDER_BY.NEWEST),
  userId: UuidSchema,
});

export type PublicRoadmapsInput = z.infer<typeof PublicRoadmapsInputSchema>;
