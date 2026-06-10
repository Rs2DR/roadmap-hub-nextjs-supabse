'use client';

import type { ComponentProps } from 'react';

import { Heart, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DASHBOARD_ROUTES } from '@/constants/routes';

import { Button } from '../ui/Button';
import { CardFooter } from '../ui/Card';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface MyRoadmapCardFooterProps extends ComponentProps<typeof CardFooter> {
  roadmapId: Roadmap['id'];
}

export function MyRoadmapCardFooter({ roadmapId }: MyRoadmapCardFooterProps) {
  const router = useRouter();

  const handleNavigateToMyRoadmap = () =>
    router.push(`${DASHBOARD_ROUTES.MY_ROADMAPS}/${roadmapId}`);

  return (
    <CardFooter className="inline-flex items-center justify-between py-2">
      <div className="inline-flex gap-2 text-muted-foreground">
        <div className="inline-flex items-center gap-1.5">
          <MessageSquare size={18} />
          <span className="trext-lg">0</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Heart size={18} />
          <span className="trext-lg">0</span>
        </div>
      </div>
      <Button onClick={handleNavigateToMyRoadmap}>Открыть</Button>
    </CardFooter>
  );
}
