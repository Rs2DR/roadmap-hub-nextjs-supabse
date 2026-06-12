import { z } from 'zod';

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Пароль должен быть минимум 8 символов'),
    confirmPassword: z.string().min(8, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
