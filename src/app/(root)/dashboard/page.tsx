'use server';

import { Suspense } from 'react';

import { PublicRoadmapsContent } from '@/components/public-roadmaps-content';
import { QueryInput } from '@/components/query-input';
import { QuerySelect } from '@/components/query-select';
import { SeactionHeader } from '@/components/section-header';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { PublicRoadmapsSearchParamsSchema } from '@/schemas/PublicRoadmapsSearchParamsSchema';

import type { PublicRoadmapsSearchParams } from '@/schemas/PublicRoadmapsSearchParamsSchema';

export default async function DashboardPage({
  searchParams,
}: PageProps<'/dashboard'>) {
  const { success, data } = PublicRoadmapsSearchParamsSchema.safeParse(
    await searchParams,
  );

  const { search, orderBy } = success
    ? data
    : ({ search: undefined, orderBy: 'newest' } as PublicRoadmapsSearchParams);

  return (
    <div className="page-wrapper">
      <SeactionHeader
        title="Опубликованные Roadmaps"
        description="Изучай, сохраняй и проходи лучшие дорожные карты"
      />
      <Suspense>
        <div className="inline-flex items-end gap-4 w-full mb-4">
          <QueryInput paramKey="search" />
          <QuerySelect
            paramKey="orderBy"
            defaultValue="newest"
            placeholder="Сортировка"
            options={[
              { value: 'newest', label: 'Сначала новые' },
              { value: 'oldest', label: 'Сначала старые' },
            ]}
          />
        </div>
      </Suspense>
      <Suspense fallback={<SpinnerFallback />}>
        <PublicRoadmapsContent search={search} orderBy={orderBy} />
      </Suspense>
    </div>
  );
}
