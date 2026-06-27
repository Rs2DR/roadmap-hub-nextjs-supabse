import z from 'zod';

import { REGEX } from '@/constants/regex';

export const HexSchema = z.string().regex(REGEX.HEX, 'Неверный HEX формат');

export type HEX = z.infer<typeof HexSchema>;
