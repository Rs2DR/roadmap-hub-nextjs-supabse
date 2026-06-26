import { Suspense } from 'react';

import { RoadmapViewerContent } from '@/components/roadmap-viewer-content';
import { SpinnerFallback } from '@/components/spinner-fallback';

export default async function ViewDashboardPage({
  params,
}: PageProps<'/dashboard/view/[id]'>) {
  const { id } = await params;

  return (
    <Suspense fallback={<SpinnerFallback />}>
      <RoadmapViewerContent id={id} />
    </Suspense>
  );
}
