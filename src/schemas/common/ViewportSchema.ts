import z from 'zod';

export const ViewportSchema = z.object({
  x: z.number('Некорректная координата X'),
  y: z.number('Некорректная координата Y'),
  zoom: z.number('Некорректное значение Zoom'),
});

export type Viewport = z.infer<typeof ViewportSchema>;
