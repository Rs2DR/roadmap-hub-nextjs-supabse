import z from 'zod';

export const UuidSchema = z.uuid('Некорректный идентификатор');

export type Uuid = z.infer<typeof UuidSchema>;
