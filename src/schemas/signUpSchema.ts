import { z } from 'zod';

export const SignUpSchema = z
  .object({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    email: z.email('Некорректный формат email'),
    password: z
      .string()
      .min(8, 'Пароль должен быть минимум 8 символов')
      .max(30, 'Пароль должен быть менее 30 символов'),
    confirmPassword: z.string().min(8, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type SignUpInput = z.infer<typeof SignUpSchema>;
