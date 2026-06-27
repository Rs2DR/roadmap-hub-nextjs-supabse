'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Share } from 'lucide-react';

import { LikeRoadmapButton } from '@/components/like-roadmap-button';
import { RoadmapCommentsSheet } from '@/components/roadmap-comments-sheet';
import { ToggleBookmarkButton } from '@/components/toggle-bookmark-button';
import { Button } from '@/components/ui/Button';
import { useIsMobile } from '@/hooks/share/useIsMobile';
import { getRoadmapForViewQueryOptions } from '@/queries/roadmap/makeRoadmapForViewOptions';

interface RoadmapViewerHeaderProps {
  id: string;
}

export function RoadmapViewerHeader({ id }: RoadmapViewerHeaderProps) {
  const isMobile = useIsMobile();
  const { data } = useSuspenseQuery(getRoadmapForViewQueryOptions({ id }));
  const { isLiked, isBookmarked } = data;

  return (
    <div className="absolute right-2 top-2 flex flex-col items-center gap-1.5 z-50 sm:flex-row">
      <LikeRoadmapButton id={id} isLiked={isLiked} />
      <RoadmapCommentsSheet roadmapId={id} />
      <ToggleBookmarkButton id={id} isBookmarked={isBookmarked} />
      <Button variant="outline" size={isMobile ? 'icon' : 'default'}>
        <Share /> <span className="hidden sm:inline">Поделиться</span>
      </Button>
    </div>
  );
}
