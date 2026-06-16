import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { FilterInput } from '@/components/filter-input';
import { ManageMyRoadmapDialog } from '@/components/manage-my-roadmap-dialog';
import { MyRoadmapsList } from '@/components/my-roadmaps-list';
import { Button } from '@/components/ui/Button';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getMyRoadmapsInfoQueryOptions } from '@/queries/getMyRoadmapsInfoQueryOptions';

export default async function MyRoadmapsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getMyRoadmapsInfoQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <div className="inline-flex w-full items-end gap-4">
          <FilterInput />
          <ManageMyRoadmapDialog
            title="Создать roadmap"
            description="Тут вы можете создать свой Roadmap"
          >
            <Button>
              <Plus />
              <span className="hidden sm:inline">Создать Roadmap</span>
            </Button>
          </ManageMyRoadmapDialog>
        </div>
        <Suspense>
          <MyRoadmapsList />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
