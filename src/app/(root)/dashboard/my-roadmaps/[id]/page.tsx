import { Suspense } from 'react';

import { RoadmapContent } from '@/components/roadmap-content';
import { SpinnerFallback } from '@/components/spinner-fallback';

export default async function MyRoadmapPage({
  params,
}: PageProps<'/dashboard/my-roadmaps/[id]'>) {
  const { id } = await params;

  return (
    <Suspense fallback={<SpinnerFallback />}>
      <RoadmapContent id={id} />
    </Suspense>
  );
}
