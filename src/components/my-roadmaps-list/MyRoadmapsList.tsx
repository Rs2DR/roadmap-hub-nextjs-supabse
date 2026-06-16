'use client';

import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { getMyRoadmapsInfoQueryOptions } from '@/queries/getMyRoadmapsInfoQueryOptions';
import { filterRoadmaps } from '@/utils/filterRoadmaps';

import { MyRoadmapCard } from '../my-roadmap-card';

import { MyRoadmapsListEmptyState } from './MyRoadmapsListEmptyState';
import { MyRoadmapsListNotFoundState } from './MyRoadmapsListNotFoundState';

export function MyRoadmapsList() {
  const [filterValue] = useQueryState('filter', {
    defaultValue: '',
  });
  const { data } = useSuspenseQuery(getMyRoadmapsInfoQueryOptions());

  const filteredRoadmaps = useMemo(
    () => filterRoadmaps(data, filterValue),
    [data, filterValue],
  );

  if (filteredRoadmaps.length === 0 && !filterValue)
    return <MyRoadmapsListEmptyState />;

  if (filteredRoadmaps.length === 0 && filterValue)
    return <MyRoadmapsListNotFoundState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {filteredRoadmaps.map((roadmap) => (
        <MyRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
