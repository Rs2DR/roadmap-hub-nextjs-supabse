import { ReactFlowProvider } from '@xyflow/react';

import { MyRoadmapsEditor } from '@/components/my-roadmaps-editor';

export default async function MyRoadmapPage({
  params,
}: PageProps<'/dashboard/my-roadmaps/[id]'>) {
  const { id } = await params;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlowProvider>
        <MyRoadmapsEditor />
      </ReactFlowProvider>
    </div>
  );
}
