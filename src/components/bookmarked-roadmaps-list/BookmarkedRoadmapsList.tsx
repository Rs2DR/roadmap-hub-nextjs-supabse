'use client';

import type { ComponentProps } from 'react';
import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Heart, Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { EmptyState } from '@/components/empty-state';
import { PublicRoadmapCard } from '@/components/public-roadmap-card';
import { FILTER_QUERY_STATE_KEY } from '@/constants/queries';
import { cn } from '@/lib/utils';
import { makeBookmarkedRoadmapsOptions } from '@/queries/roadmap';
import { filterRoadmaps } from '@/utils/roadmap';

export function BookmarkedRoadmapsList({
  className,
  ...props
}: ComponentProps<'div'>) {
  const [filterValue] = useQueryState(FILTER_QUERY_STATE_KEY, {
    defaultValue: '',
    clearOnDefault: true,
  });
  const { data } = useSuspenseQuery(makeBookmarkedRoadmapsOptions());

  const filteredRoadmaps = useMemo(
    () => filterRoadmaps(data, filterValue),
    [data, filterValue],
  );

  const isEmpty = filteredRoadmaps.length === 0;

  if (isEmpty) {
    if (filterValue) {
      return (
        <EmptyState
          icon={Search}
          title="Ничего не найдено"
          description="Попробуйте изменить запрос"
        />
      );
    }

    return (
      <EmptyState
        icon={Heart}
        title="Пока у вас нет избранных Roadmap'ов"
        description="Скорее добавьте сюда Roadmap'ы, которые вы хотите пройти"
      />
    );
  }

  return (
    <div className={cn('cards-list', className)} {...props}>
      {filteredRoadmaps.map((roadmap) => (
        <PublicRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
