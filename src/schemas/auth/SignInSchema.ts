import { z } from 'zod';

import { EmailSchema, PasswordSchema } from '@/schemas/share';

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignInInput = z.infer<typeof SignInSchema>;
