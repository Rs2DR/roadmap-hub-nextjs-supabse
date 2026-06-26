'use client';

import type { ComponentProps } from 'react';

import { Heart, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DASHBOARD_ROUTES } from '@/constants/routes';

import { Button } from '../ui/Button';
import { CardFooter } from '../ui/Card';

import type { MyRoadmap } from '@/schemas/MyRoadmapSchema';

interface MyRoadmapCardFooterProps extends ComponentProps<typeof CardFooter> {
  roadmap: MyRoadmap;
}

export function MyRoadmapCardFooter({ roadmap }: MyRoadmapCardFooterProps) {
  const router = useRouter();

  const { id, commentsCount, likesCount, isPublic } = roadmap;

  const handleNavigateToMyRoadmap = () =>
    router.push(`${DASHBOARD_ROUTES.MY_ROADMAPS}/${id}`);

  const visibilityLabel = isPublic ? 'Опубликован' : null;

  return (
    <CardFooter className="inline-flex items-center justify-between py-2">
      <div className="inline-flex gap-2 text-muted-foreground">
        <div className="inline-flex items-center gap-1.5">
          <MessageSquare size={18} />
          <span>{commentsCount}</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Heart className="text-red-500" size={18} />
          <span>{likesCount}</span>
        </div>
      </div>
      <div className="inline-flex items-center gap-4">
        {visibilityLabel && (
          <div className="inline-flex items-center gap-2">
            <div className="relative size-2">
              <span className="absolute size-1.5 bg-green-300 rounded-full animate-ping" />
              <span className="absolute size-2 bg-green-300 rounded-full" />
            </div>
            <span className="text-xs text-muted-foreground">
              {visibilityLabel}
            </span>
          </div>
        )}
        <Button onClick={handleNavigateToMyRoadmap}>Открыть</Button>
      </div>
    </CardFooter>
  );
}
