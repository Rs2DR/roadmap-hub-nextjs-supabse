'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import { useState } from 'react';

import { ManageMyRoadmapForm } from '../manage-my-roadmap-from';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';
import type { FormModeType } from '@/types/FormModeType';

interface ManageMyRoadmapDialogProps extends ComponentProps<typeof Dialog> {
  title: string;
  description: string;

  mode?: FormModeType;
  roadmapId?: string;

  initialValues?: ManageMyRoadmapInput;
}

export function ManageMyRoadmapDialog({
  children,
  title,
  description,
  mode = 'create',
  roadmapId,
  initialValues,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  modal,
  defaultOpen,
}: PropsWithChildren<ManageMyRoadmapDialogProps>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = isControlled ? controlledOnOpenChange! : setUncontrolledOpen;

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal={modal}
      defaultOpen={defaultOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>

        <ManageMyRoadmapForm
          mode={mode}
          roadmapId={roadmapId}
          initialValues={initialValues}
          onSuccess={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
