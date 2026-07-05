import z from 'zod';

export const EmailSchema = z.email('Некорректный формат email');

export type Email = z.infer<typeof EmailSchema>;
