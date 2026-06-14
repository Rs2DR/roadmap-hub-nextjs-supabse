import { ReactFlowProvider } from '@xyflow/react';

import { RoadmapEditor } from '@/components/roadmap-editor';

export default async function MyRoadmapPage({
  params,
}: PageProps<'/dashboard/my-roadmaps/[id]'>) {
  const { id } = await params;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlowProvider>
        <RoadmapEditor />
      </ReactFlowProvider>
    </div>
  );
}
