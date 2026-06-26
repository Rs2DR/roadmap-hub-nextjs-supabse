'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';

import { RoadmapViewer } from '@/components/roadmap-viewer';
import { RoadmapViewerHeader } from '@/components/roadmap-viewer-content/RoadmapViewerHeader';
import { ROADMAP_VIEW_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getRoadmapForViewServer } from '@/services/roadmaps';

export async function RoadmapViewerContent({ id }: { id: string }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROADMAP_VIEW_KEY, id],
    queryFn: () => getRoadmapForViewServer({ id }),
  });

  return (
    <div className="page-wrapper relative w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RoadmapViewerHeader id={id} />
        <ReactFlowProvider>
          <RoadmapViewer id={id} />
        </ReactFlowProvider>
      </HydrationBoundary>
    </div>
  );
}
