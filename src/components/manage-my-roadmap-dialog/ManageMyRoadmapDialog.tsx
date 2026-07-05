'use client';

import type { ComponentProps, PropsWithChildren } from 'react';
import { useState } from 'react';

import { FORM_MODE } from '@/constants/form';

import { ManageMyRoadmapForm } from '../manage-my-roadmap-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';

import type { ManageMyRoadmapInput } from '@/schemas/roadmap/form/MyRoadmapInfoInputSchema';
import type { FormMode } from '@/types/form/FormMode';

interface ManageMyRoadmapDialogProps extends ComponentProps<typeof Dialog> {
  title: string;
  description: string;

  mode?: FormMode;
  roadmapId?: string;

  initialValues?: ManageMyRoadmapInput;
}

export function ManageMyRoadmapDialog({
  children,
  title,
  description,
  mode = FORM_MODE.CREATE,
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
