import { z } from 'zod';

import { EmailSchema, PasswordSchema } from '@/schemas/common';

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignInInput = z.infer<typeof SignInSchema>;
