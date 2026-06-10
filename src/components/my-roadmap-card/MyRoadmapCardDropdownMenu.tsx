'use client';

import { useState } from 'react';

import { MoreHorizontal, Pencil, Share, Trash } from 'lucide-react';

import { ManageMyRoadmapDialog } from '../manage-my-roadmap-dialog';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Separator } from '../ui/Separator';

import type { Roadmap } from '@/shcemas/RoadmapSchema';

interface MyRoadmapCardDropdownMenuProps {
  roadmap: Roadmap;
}

export function MyRoadmapCardDropdownMenu({
  roadmap,
}: MyRoadmapCardDropdownMenuProps) {
  const { id, title, description } = roadmap;

  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <ManageMyRoadmapDialog
        mode="update"
        roadmapId={id}
        initialValues={{ title, description }}
        title="Изменить Roadmap"
        description="Тут вы можете изменить свой Roadmap"
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Инструменты</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="text-accent-foreground"
            >
              <Pencil /> Изменить
            </DropdownMenuItem>

            <DropdownMenuItem className="text-accent-foreground">
              <Trash /> Удалить
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <Separator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Основное</DropdownMenuLabel>
            <DropdownMenuItem className="text-accent-foreground">
              <Share /> Поделиться
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
