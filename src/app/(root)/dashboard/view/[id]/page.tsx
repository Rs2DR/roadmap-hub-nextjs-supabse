import { Suspense } from 'react';

import { Heart, MessageCircle, Share } from 'lucide-react';

import { RoadmapViewerContent } from '@/components/roadmap-viewer-content';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { ToggleBookmarkButton } from '@/components/toggle-bookmark-button';
import { Button } from '@/components/ui/Button';

export default async function ViewDashboardPage({
  params,
}: PageProps<'/dashboard/view/[id]'>) {
  const { id } = await params;

  return (
    <div className="page-wrapper relative w-full h-full">
      <div className="absolute right-2 top-2 inline-flex items-center gap-1.5 z-50">
        <Button variant="outline" size="icon">
          <Heart />
        </Button>
        <Button variant="outline" size="icon">
          <MessageCircle />
        </Button>
        <ToggleBookmarkButton id={id} isBookmarked={true} />
        <Button variant="outline">
          <Share /> Поделиться
        </Button>
      </div>
      <Suspense fallback={<SpinnerFallback />}>
        <RoadmapViewerContent id={id} />
      </Suspense>
    </div>
  );
}
