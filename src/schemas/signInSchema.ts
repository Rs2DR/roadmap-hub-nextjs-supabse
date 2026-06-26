import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.email('Некорректный формат email'),
  password: z.string().min(8, 'Пароль должен быть минимум 8 символов'),
});

export type SignInInput = z.infer<typeof SignInSchema>;
