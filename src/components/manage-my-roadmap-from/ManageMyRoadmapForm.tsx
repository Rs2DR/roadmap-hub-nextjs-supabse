'use client';

import type { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { DASHBOARD_ROUTES } from '@/constants/routes';
import { useCreateRoadmap } from '@/hooks/useCreateRoadmap';
import { useUpdateRoadmap } from '@/hooks/useUpdateRoadmap';
import { cn } from '@/lib/utils';
import { ManageMyRoadmapSchema } from '@/shcemas/ManageMyRoadmapSchema';

import { Button } from '../ui/Button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';
import type { FormModeType } from '@/types/FormModeType';

interface ManageMyRoadmapFormProps extends ComponentProps<'form'> {
  mode?: FormModeType;
  roadmapId?: string;
  initialValues?: ManageMyRoadmapInput;
  onSuccess?: () => void;
}

export function ManageMyRoadmapForm({
  mode = 'create',
  roadmapId,
  initialValues,
  onSuccess,
  className,
  ...props
}: ManageMyRoadmapFormProps) {
  const router = useRouter();

  const { mutate: createRoadmap, isPending: isCreating } = useCreateRoadmap();
  const { mutate: updateRoadmap, isPending: isUpdating } = useUpdateRoadmap();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<ManageMyRoadmapInput>({
    mode: 'onChange',
    resolver: zodResolver(ManageMyRoadmapSchema),
    defaultValues: initialValues ?? {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: ManageMyRoadmapInput) => {
    if (mode === 'create') {
      createRoadmap(data, {
        onSuccess: ({ data: { id } }) => {
          reset();
          onSuccess?.();
          router.push(`${DASHBOARD_ROUTES.MY_ROADMAPS}/${id}`);
        },
      });
    }

    if (mode === 'update') {
      if (!roadmapId) {
        throw new Error('roadmapId is required for update');
      }

      updateRoadmap(
        { id: roadmapId, ...data },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="title">Название</FieldLabel>
              <Input
                {...field}
                id="title"
                type="text"
                placeholder="Название Roadmap"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="description">Описание</FieldLabel>
              <Textarea
                {...field}
                id="description"
                placeholder="Описание для Roadmap"
                className="max-h-40"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button
            type="submit"
            disabled={!isValid}
            loading={isPending || isSubmitting}
          >
            {mode === 'create' ? 'Создать' : 'Сохранить'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
