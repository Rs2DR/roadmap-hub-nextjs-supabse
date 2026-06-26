'use client';

import { useState } from 'react';

import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

import { useDeleteRoadmap } from '@/hooks/useDeleteRoadmap';

import { CustomAlertDialog } from '../custom-alert-dialog';
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

import type { MyRoadmap } from '@/shcemas/MyRoadmapSchema';

interface MyRoadmapCardDropdownMenuProps {
  roadmap: MyRoadmap;
}

export function MyRoadmapCardDropdownMenu({
  roadmap,
}: MyRoadmapCardDropdownMenuProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteRoadmap } = useDeleteRoadmap();

  const { id, title, description } = roadmap;

  const handleEditOpen = () => setIsEditOpen(true);
  const handleDeleteOpen = () => setIsDeleteOpen(true);

  const handleDeleteRoadmap = () => {
    deleteRoadmap({ id });
  };

  return (
    <>
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
              onClick={handleEditOpen}
              className="text-accent-foreground"
            >
              <Pencil /> Изменить
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDeleteOpen}
              className="text-accent-foreground"
            >
              <Trash /> Удалить
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* MANAGE */}
      <ManageMyRoadmapDialog
        mode="update"
        roadmapId={id}
        initialValues={{ title, description }}
        title="Изменить Roadmap"
        description="Тут вы можете изменить свой Roadmap"
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      {/* DELETE */}
      <CustomAlertDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={`Удалить ${title}?`}
        description="Это действие нельзя будет отменить!"
        onConfirm={handleDeleteRoadmap}
        confirmText="Удалить"
      />
    </>
  );
}
