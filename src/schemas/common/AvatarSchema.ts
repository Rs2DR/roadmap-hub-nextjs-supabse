import z from 'zod';

export const AvatarSchema = z
  .string()
  .nullable()
  .transform((val) => val ?? '');
