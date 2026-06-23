'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';

import { RoadmapViewer } from '@/components/roadmap-viewer';
import { ROADMAPS_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getRoadmapForViewServer } from '@/services/roadmaps';

export async function RoadmapViewerContent({ id }: { id: string }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROADMAPS_KEY, id],
    queryFn: () => getRoadmapForViewServer({ id }),
  });

  return (
    <div className="w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReactFlowProvider>
          <RoadmapViewer id={id} />
        </ReactFlowProvider>
      </HydrationBoundary>
    </div>
  );
}
