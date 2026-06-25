'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { MessageCircle, Share } from 'lucide-react';

import { LikeRoadmapButton } from '@/components/like-roadmap-button';
import { ToggleBookmarkButton } from '@/components/toggle-bookmark-button';
import { Button } from '@/components/ui/Button';
import { getRoadmapForViewQueryOptions } from '@/queries/getRoadmapForViewQueryOptions';

interface RoadmapViewerHeaderProps {
  id: string;
}

export function RoadmapViewerHeader({ id }: RoadmapViewerHeaderProps) {
  const { data } = useSuspenseQuery(getRoadmapForViewQueryOptions({ id }));
  const { isLiked, isBookmarked } = data;

  return (
    <div className="absolute right-2 top-2 inline-flex items-center gap-1.5 z-50">
      <LikeRoadmapButton id={id} isLiked={isLiked} />
      <Button variant="outline" size="icon">
        <MessageCircle />
      </Button>
      <ToggleBookmarkButton id={id} isBookmarked={isBookmarked} />
      <Button variant="outline">
        <Share /> Поделиться
      </Button>
    </div>
  );
}
