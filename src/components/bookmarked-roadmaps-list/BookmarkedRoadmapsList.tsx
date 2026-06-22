'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PublicRoadmapCard } from '@/components/public-roadmap-card';
import { getBookmarkedRoadmapsQueryOptions } from '@/queries/getBookedmarkedRoadmapsQueryOptions';

export function BookmarkedRoadmapsList() {
  const { data } = useSuspenseQuery(getBookmarkedRoadmapsQueryOptions());

  return (
    <div className="cards-list">
      {data.map((roadmap) => (
        <PublicRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
