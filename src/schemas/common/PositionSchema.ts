import z from 'zod';

export const PositionSchema = z.object({
  x: z.number('Некорректная координата X'),
  y: z.number('Некорректная координата Y'),
});

export type Position = z.infer<typeof PositionSchema>;
