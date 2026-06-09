'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyRoadmapsQueryOptions } from '@/queries/getMyRoadmapQueryOptions';

import { MyRoadmapCard } from '../my-roadmap-card';

interface MyRoadmapListProps {
  userId: string;
}

export function MyRoadmapsList({ userId }: MyRoadmapListProps) {
  const { data: roadmaps } = useSuspenseQuery(
    getMyRoadmapsQueryOptions({ userId }),
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {roadmaps.map((roadmap) => (
        <MyRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
