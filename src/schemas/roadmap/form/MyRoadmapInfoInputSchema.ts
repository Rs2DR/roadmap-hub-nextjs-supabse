import { z } from 'zod';

export const MyRoadmapInfoInputSchema = z.object({
  title: z
    .string('Некорректный формат загаловка')
    .nonempty('Название обязательно')
    .max(80, {
      error: ({ maximum }) => `Название должно быть меньше ${maximum} символов`,
    }),
  description: z
    .string()
    .nonempty('Описание обязательно')
    .max(300, {
      error: ({ maximum }) => `Описание должно быть меньше ${maximum} символов`,
    }),
});

export type MyRoadmapInfoInput = z.infer<typeof MyRoadmapInfoInputSchema>;
