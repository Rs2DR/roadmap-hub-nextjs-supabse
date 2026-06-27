import { z } from 'zod';

export const ManageMyRoadmapSchema = z.object({
  title: z
    .string()
    .nonempty({ error: 'Название обязательно' })
    .max(300, { error: 'Название должно быть меньше 80 символов' }),
  description: z
    .string()
    .nonempty({ error: 'Описание обязательно' })
    .max(300, { error: 'Описание должно быть меньше 300 символов' }),
});

export type ManageMyRoadmapInput = z.infer<typeof ManageMyRoadmapSchema>;
