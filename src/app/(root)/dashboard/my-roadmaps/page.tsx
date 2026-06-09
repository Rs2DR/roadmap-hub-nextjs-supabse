import { Plus, Search } from 'lucide-react';

import { MyRoadmapCard } from '@/components/my-roadmap-card';
import { Button } from '@/components/ui/Button';
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';

export default function MyRoadmapsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex w-full items-end gap-4">
        <Field className="grow">
          <FieldLabel htmlFor="input-search-roadmap">
            Найди свой Roadmap
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput id="input-search-roadmap" placeholder="search" />
          </InputGroup>
        </Field>
        <Button>
          <Plus />
          <span className="hidden sm:inline">Создать Roadmap</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
        <MyRoadmapCard />
      </div>
    </div>
  );
}
