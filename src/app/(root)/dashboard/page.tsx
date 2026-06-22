'use server';

import { Suspense } from 'react';

import { FilterInput } from '@/components/filter-input';
import { PublicRoadmapsContent } from '@/components/public-roadmaps-content';
import { SeactionHeader } from '@/components/section-header';
import { SpinnerFallback } from '@/components/spinner-fallback';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export default async function DashboardPage() {
  return (
    <div className="page-wrapper">
      <SeactionHeader
        title="Опубликованные Roadmaps"
        description="Изучай, сохраняй и проходи лучшие дорожные карты"
      />
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
      <Suspense fallback={<SpinnerFallback />}>
        <PublicRoadmapsContent />
      </Suspense>
    </div>
  );
}
