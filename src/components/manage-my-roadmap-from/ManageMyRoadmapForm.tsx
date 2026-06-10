'use client';

import type { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateRoadmap } from '@/hooks/useCreateRoadmap';
import { cn } from '@/lib/utils';
import { ManageMyRoadmapSchema } from '@/shcemas/ManageMyRoadmapSchema';

import { Button } from '../ui/Button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';

import type { ManageMyRoadmapInput } from '@/shcemas/ManageMyRoadmapSchema';

export function ManageMyRoadmapForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  const { mutate: createRoadmap, isPending } = useCreateRoadmap();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<ManageMyRoadmapInput>({
    mode: 'onChange',
    resolver: zodResolver(ManageMyRoadmapSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: ManageMyRoadmapInput) => {
    createRoadmap(data);
  };

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
            Создать
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
