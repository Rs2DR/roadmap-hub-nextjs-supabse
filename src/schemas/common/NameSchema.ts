import z from 'zod';

export const NameSchema = z.string('Некорректный формат имени').min(2, {
  error: ({ minimum }) => `Имя должно содержать минимум ${minimum} символа`,
});

export type Name = z.infer<typeof NameSchema>;
