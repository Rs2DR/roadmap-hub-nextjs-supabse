import { Search } from 'lucide-react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/Empty';

export function MyRoadmapsListNotFoundState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle className="text-xl">Совпадений не найдено</EmptyTitle>
        <EmptyDescription>
          Мы не нашли Roadmap’ов по вашему запросу. Попробуйте другое название
          или уберите фильтр
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
