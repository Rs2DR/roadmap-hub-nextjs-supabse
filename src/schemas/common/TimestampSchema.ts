import z from 'zod';

export const TimestampSchema = z.iso.datetime('Некорректный формат даты');

export type Timestamp = z.infer<typeof TimestampSchema>;
