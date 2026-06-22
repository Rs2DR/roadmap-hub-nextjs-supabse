'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Search, Globe } from 'lucide-react';
import { useQueryStates, parseAsString } from 'nuqs';

import { EmptyState } from '@/components/empty-state';
import { PublicRoadmapCard } from '@/components/public-roadmap-card';
import { getPublicRoadmapsQueryOptions } from '@/queries/getPublicRoadmapsQueryOptions';

import type { RoadmapOrderBy } from '@/types/RoadmapOrderBy';

export function PublicRoadmapsList() {
  const [query] = useQueryStates({
    search: parseAsString.withDefault(''),
    orderBy: parseAsString.withDefault('newest'),
  });

  const search = query.search;
  const orderBy = query.orderBy as RoadmapOrderBy;

  const { data } = useSuspenseQuery(
    getPublicRoadmapsQueryOptions({
      search: search.trim() === '' ? undefined : search,
      orderBy,
    }),
  );

  const isEmpty = data.length === 0;

  if (isEmpty) {
    if (search) {
      return (
        <EmptyState
          icon={<Search />}
          title="Ничего не найдено"
          description="Попробуйте изменить запрос"
        />
      );
    }

    return (
      <EmptyState
        icon={<Globe />}
        title="Пока нет публичных Roadmap’ов"
        description="Станьте первым, кто поделится своим Roadmap"
      />
    );
  }

  return (
    <div className="cards-list">
      {data.map((roadmap) => (
        <PublicRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
