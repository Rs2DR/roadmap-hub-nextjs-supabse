import { FolderBookmark } from 'lucide-react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty';

export function MyRoadmapsListEmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderBookmark />
        </EmptyMedia>
        <EmptyTitle className="text-xl">Здесь пока пусто</EmptyTitle>
        <EmptyDescription>
          Создайте первый Roadmap и начните выстраивать свой путь шаг за шагом
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
