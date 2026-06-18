import { Suspense } from 'react';

import { RoadmapContent } from '@/components/roadmap-content';
import { Spinner } from '@/components/ui/Spinner';

export default async function MyRoadmapPage({
  params,
}: PageProps<'/dashboard/my-roadmaps/[id]'>) {
  const { id } = await params;

  return (
    <Suspense fallback={<Spinner />}>
      <RoadmapContent id={id} />
    </Suspense>
  );
}
