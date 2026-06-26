'use client';

import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Search, Folder } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { EmptyState } from '@/components/empty-state';
import { MyRoadmapCard } from '@/components/my-roadmap-card';
import { getMyRoadmapsInfoQueryOptions } from '@/queries/getMyRoadmapsInfoQueryOptions';
import { filterRoadmaps } from '@/utils/filterRoadmaps';

export function MyRoadmapsList() {
  const [filterValue] = useQueryState('filter', {
    defaultValue: '',
  });

  const { data } = useSuspenseQuery(getMyRoadmapsInfoQueryOptions());

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
          title="Совпадений не найдено"
          description="Попробуйте изменить запрос или убрать фильтр"
        />
      );
    }

    return (
      <EmptyState
        icon={Folder}
        title="У вас пока нет Roadmap’ов"
        description="Создайте свой первый Roadmap, чтобы начать"
      />
    );
  }

  return (
    <div className="cards-list">
      {filteredRoadmaps.map((roadmap) => (
        <MyRoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  );
}
