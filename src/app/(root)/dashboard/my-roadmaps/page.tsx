'use server';

import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { FilterInput } from '@/components/filter-input';
import { ManageMyRoadmapDialog } from '@/components/manage-my-roadmap-dialog';
import { MyRoadmapsList } from '@/components/my-roadmaps-list';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getMyRoadmapsInfoServer } from '@/services/roadmaps/getMyRoadmapsInfoServer';

export default async function MyRoadmapsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [MY_ROADMAPS_KEY],
    queryFn: () => getMyRoadmapsInfoServer(),
  });

  return (
    <div className="flex flex-col gap-4 px-4">
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Spinner />}>
          <MyRoadmapsList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
