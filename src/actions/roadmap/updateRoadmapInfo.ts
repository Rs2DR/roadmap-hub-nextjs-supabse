'use server';

import { updateRoadmapInfoCore } from '@/core/roadmaps';
import { authActionClient } from '@/lib/next-safe-actions';
import { UuidSchema } from '@/schemas/common';
import { MyRoadmapInfoSchema } from '@/schemas/roadmap';
import { MyRoadmapInfoInputSchema } from '@/schemas/roadmap/form';

const UpdateRoadmapInfoSchema = MyRoadmapInfoInputSchema.extend({
  id: UuidSchema,
});

export const updateRoadmapInfo = authActionClient
  .inputSchema(UpdateRoadmapInfoSchema)
  .outputSchema(MyRoadmapInfoSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { supabase, userId } = ctx;
    const { id, title, description } = parsedInput;

    return updateRoadmapInfoCore(supabase, {
      id,
      userId,
      title,
      description,
    });
  });
