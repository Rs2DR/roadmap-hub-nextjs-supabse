import { Suspense } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';

import { ManageMyRoadmapForm } from '@/components/manage-my-roadmap-from';
import { MyRoadmapsList } from '@/components/my-roadmaps-list';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/Field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getMyRoadmapsQueryOptions } from '@/queries/getMyRoadmapQueryOptions';

export default async function MyRoadmapsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getMyRoadmapsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
              <InputGroupInput
                id="input-search-roadmap"
                placeholder="Поиск..."
              />
            </InputGroup>
          </Field>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                <span className="hidden sm:inline">Создать Roadmap</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Создание Roadmap</DialogTitle>
              <DialogDescription>
                Тут вы можете создать свой Roadmap
              </DialogDescription>
              <ManageMyRoadmapForm />
            </DialogContent>
          </Dialog>
        </div>
        <Suspense>
          <MyRoadmapsList />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
