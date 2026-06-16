'use server';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';

import { RoadmapEditor } from '@/components/roadmap-editor';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getRoadmapForEditQueryOptions } from '@/queries/getRoadmapForEditQueryOptions';

export async function RoadmapContent({ id }: { id: string }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getRoadmapForEditQueryOptions({ id }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div style={{ height: '100%', width: '100%' }}>
        <ReactFlowProvider>
          <RoadmapEditor id={id} />
        </ReactFlowProvider>
      </div>
    </HydrationBoundary>
  );
}
