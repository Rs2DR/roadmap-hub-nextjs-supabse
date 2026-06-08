'use client';

import type { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRequestPasswordReset } from '@/hooks/useRequestPasswordReset';
import { cn } from '@/lib/utils';
import { requestResetPasswordSchema } from '@/shcemas/requestResetPasswordSchema';

import { Button } from '../ui/Button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';

import type { RequestResetPasswordInput } from '@/shcemas/requestResetPasswordSchema';

export function RequestResetPasswordForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  const { mutate: resetPassowrd, isPending } = useRequestPasswordReset();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<RequestResetPasswordInput>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RequestResetPasswordInput) => {
    resetPassowrd(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-center">
          <h1 className="text-2xl font-bold">Смена пароля</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Мы отправим вам письмо для смены пароля
          </p>
        </div>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
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
            Запросить письмо
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
