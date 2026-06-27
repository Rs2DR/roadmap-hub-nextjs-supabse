import { Suspense } from 'react';

import { Plus } from 'lucide-react';

import { ManageMyRoadmapDialog } from '@/components/manage-my-roadmap-dialog';
import { MyRoadmapsContent } from '@/components/my-roadmaps-content';
import { QueryInput } from '@/components/query-input';
import { SeactionHeader } from '@/components/section-header';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function MyRoadmapsPage() {
  return (
    <div className="page-wrapper">
      <SeactionHeader
        title="Мои Roadmap'ы"
        description="Создай свой уникальный Roadmap и удиви всех"
      />
      <Suspense>
        <div className="inline-flex w-full items-end gap-4 mb-4">
          <QueryInput paramKey="filter" />

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
      </Suspense>
      <Suspense fallback={<SpinnerFallback />}>
        <MyRoadmapsContent />
      </Suspense>
    </div>
  );
}
