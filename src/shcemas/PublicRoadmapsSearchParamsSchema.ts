import z from 'zod';

import { ROADMAP_FILTER_OPTIONS } from '@/constants/form';

export const PublicRoadmapsSearchParamsSchema = z.object({
  search: z.string().trim().min(1).max(100).optional().or(z.literal('')),
  orderBy: z.enum(ROADMAP_FILTER_OPTIONS.ORDER_BY).optional(),
});

export type PublicRoadmapsSearchParams = z.infer<
  typeof PublicRoadmapsSearchParamsSchema
>;
