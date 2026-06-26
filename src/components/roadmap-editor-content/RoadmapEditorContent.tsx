'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';

import { RoadmapEditor } from '@/components/roadmap-editor';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getRoadmapForEditServer } from '@/services/roadmaps';

export async function RoadmapEditorContent({ id }: { id: string }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MY_ROADMAPS_KEY, id],
    queryFn: () => getRoadmapForEditServer({ id }),
  });

  return (
    <div className="w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReactFlowProvider>
          <RoadmapEditor id={id} />
        </ReactFlowProvider>
      </HydrationBoundary>
    </div>
  );
}
