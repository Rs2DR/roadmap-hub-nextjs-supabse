'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PublicRoadmapCard } from '@/components/public-roadmap-card';
import { getPublicRoadmapsQueryOptions } from '@/queries/getPublicRoadmapsQueryOptions';

export function PublicRoadmapsList() {
  const { data } = useSuspenseQuery(
    getPublicRoadmapsQueryOptions({ search: undefined, orderBy: 'newest' }),
  );

  return (
    <div className="grid xl:grid-cols-4">
      {data.map((roadmap) => (
        <PublicRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
