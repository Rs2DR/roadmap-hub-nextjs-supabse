'use server';

import { Suspense } from 'react';

import { Plus } from 'lucide-react';

import { ManageMyRoadmapDialog } from '@/components/manage-my-roadmap-dialog';
import { MyRoadmapsContent } from '@/components/my-roadmaps-content';
import { QueryInput } from '@/components/query-input';
import { SeactionHeader } from '@/components/section-header';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { Button } from '@/components/ui/Button';

export default async function MyRoadmapsPage() {
  return (
    <div className="page-wrapper">
      <SeactionHeader
        title="Мои Roadmap'ы"
        description="Создай свой уникальный Roadmap и удиви всех"
      />
      <div className="inline-flex w-full items-end gap-4 mb-4">
        <Suspense>
          <QueryInput />
        </Suspense>
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
      <Suspense fallback={<SpinnerFallback />}>
        <MyRoadmapsContent />
      </Suspense>
    </div>
  );
}
