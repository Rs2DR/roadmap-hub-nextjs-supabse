'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Globe, Heart, Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { EmptyState } from '@/components/empty-state';
import { PublicRoadmapCard } from '@/components/public-roadmap-card';
import { getBookmarkedRoadmapsQueryOptions } from '@/queries/getBookedmarkedRoadmapsQueryOptions';

export function BookmarkedRoadmapsList() {
  const [filterValue] = useQueryState('filter', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const { data } = useSuspenseQuery(getBookmarkedRoadmapsQueryOptions());

  const isEmpty = data.length === 0;

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
    <div className="cards-list">
      {data.map((roadmap) => (
        <PublicRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
