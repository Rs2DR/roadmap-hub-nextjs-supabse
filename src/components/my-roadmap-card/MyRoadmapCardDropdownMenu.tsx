'use client';

import { useState } from 'react';

import { MoreHorizontal, Pencil, Share, Trash } from 'lucide-react';

import { useDeleteRoadmap } from '@/hooks/useDeleteRoadmap';

import { ManageMyRoadmapDialog } from '../manage-my-roadmap-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/AlertDialog';
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
      <ManageMyRoadmapDialog
        mode="update"
        roadmapId={id}
        initialValues={{ title, description }}
        title="Изменить Roadmap"
        description="Тут вы можете изменить свой Roadmap"
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Вы уверены, что хотите удалить ${title}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя будет отменить! Ваш Roadmap будет безвозвратно
              удален!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteRoadmap}
            >
              Продолжить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
