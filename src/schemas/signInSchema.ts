import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email('Некорректный формат email'),
  password: z
    .string()
    .min(8, 'Пароль должен быть минимум 8 символов')
    .max(30, 'Пароль должен быть менее 30 символов'),
});

export type SignInInput = z.infer<typeof SignInSchema>;
