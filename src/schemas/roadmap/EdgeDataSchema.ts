import { EdgeDataDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const EdgeDataSchema = EdgeDataDbSchema;

export type EdgeData = z.infer<typeof EdgeDataSchema>;
