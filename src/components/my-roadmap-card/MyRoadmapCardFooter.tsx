'use client';

import type { ComponentProps } from 'react';

import { Heart, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DASHBOARD_ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

import { Badge } from '../ui/badge';
import { Button } from '../ui/Button';
import { CardFooter } from '../ui/Card';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface MyRoadmapCardFooterProps extends ComponentProps<typeof CardFooter> {
  roadmap: Roadmap;
}

export function MyRoadmapCardFooter({ roadmap }: MyRoadmapCardFooterProps) {
  const router = useRouter();

  const { id, commentsCount, likesCount, isPublic } = roadmap;

  const handleNavigateToMyRoadmap = () =>
    router.push(`${DASHBOARD_ROUTES.MY_ROADMAPS}/${id}`);

  const visibilityLabel = isPublic ? 'Публичный' : 'Приватный';

  const visibilityBadgeClass = isPublic
    ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
    : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300';

  return (
    <CardFooter className="inline-flex items-center justify-between py-2">
      <div className="inline-flex gap-2 text-muted-foreground">
        <div className="inline-flex items-center gap-1.5">
          <MessageSquare size={18} />
          <span className="trext-lg">{commentsCount}</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Heart size={18} />
          <span className="trext-lg">{likesCount}</span>
        </div>
      </div>
      <div className="inline-flex items-center gap-2">
        <Badge className={cn(visibilityBadgeClass)}>{visibilityLabel}</Badge>
        <Button onClick={handleNavigateToMyRoadmap}>Открыть</Button>
      </div>
    </CardFooter>
  );
}
