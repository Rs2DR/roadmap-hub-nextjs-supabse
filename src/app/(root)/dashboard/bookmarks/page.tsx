import { Suspense } from 'react';

import { BookmarksContent } from '@/components/bookmarks-content';
import { QueryInput } from '@/components/query-input';
import { SeactionHeader } from '@/components/section-header';
import { SpinnerFallback } from '@/components/spinner-fallback';

export default async function BookmarksPage() {
  return (
    <div className="page-wrapper">
      <SeactionHeader
        title="Избранные Roadmap'ы"
        description="Тут собраны rodmap'ы отложенные тобой"
      />
      <Suspense>
        <div className="inline-flex items-end w-full mb-4">
          <QueryInput paramKey="filter" />
        </div>
      </Suspense>
      <Suspense fallback={<SpinnerFallback />}>
        <BookmarksContent />
      </Suspense>
    </div>
  );
}
