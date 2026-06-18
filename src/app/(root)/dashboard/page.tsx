'use server';

import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { FilterInput } from '@/components/filter-input';
import { PublicRoadmapsList } from '@/components/public-roadmaps-list';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { ROADMAPS } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query';
import { getPublicRoadmapsServer } from '@/services/roadmaps';

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [ROADMAPS],
    queryFn: () =>
      getPublicRoadmapsServer({ search: undefined, orderBy: 'newest' }),
  });

  return (
    <div className="px-4 pt-2">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-4xl">Опубликованные Roadmaps</h2>
        <p className="text-muted-foreground">
          Изучай, сохраняй и проходи лучшие дорожные карты
        </p>
      </div>
      <div className="inline-flex items-end gap-4 w-full mb-4">
        <Suspense>
          <FilterInput />
        </Suspense>
        <Select defaultValue="new">
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="new">Сначала новые</SelectItem>
            <SelectItem value="old">Сначала старые</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Spinner />}>
          <PublicRoadmapsList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
