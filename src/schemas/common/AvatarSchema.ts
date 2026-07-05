import z from 'zod';

export const AvatarSchema = z
  .url('Некорректный формат аватарки')
  .nullable()
  .transform((val) => val ?? '');
