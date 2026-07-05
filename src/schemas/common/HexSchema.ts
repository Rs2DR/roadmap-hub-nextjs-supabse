import z from 'zod';

import { REGEX } from '@/constants/regex';

export const HexSchema = z
  .string('Некорректное занчение HEX')
  .trim()
  .regex(REGEX.HEX, 'Неверный HEX формат');

export type HEX = z.infer<typeof HexSchema>;
