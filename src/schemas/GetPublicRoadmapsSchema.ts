import z from 'zod';

import { ROADMAP_FILTER_OPTIONS } from '@/constants/form';

export const GetPublicRoadmapsSchema = z.object({
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
  userId: z.uuid({ message: 'Некорректный формат ID пользователя' }),
});

export type GetPublicRoadmapsInput = z.infer<typeof GetPublicRoadmapsSchema>;
