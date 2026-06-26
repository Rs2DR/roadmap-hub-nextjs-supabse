import { Suspense } from 'react';

import { RoadmapEditorContent } from '@/components/roadmap-editor-content';
import { SpinnerFallback } from '@/components/spinner-fallback';

export default async function MyRoadmapPage({
  params,
}: PageProps<'/dashboard/my-roadmaps/[id]'>) {
  const { id } = await params;

  return (
    <Suspense fallback={<SpinnerFallback />}>
      <RoadmapEditorContent id={id} />
    </Suspense>
  );
}
