'use client';

import type { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { APP_ROUTES } from '@/constants/routes';
import { useUpdatePassword } from '@/hooks/useUpdatePassword';
import { cn } from '@/lib/utils';
import { ResetPasswordSchema } from '@/shcemas/ResetPasswordSchema';

import { Button } from '../ui/Button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';

import type { ResetPasswordInput } from '@/shcemas/ResetPasswordSchema';

export function ResetPasswordForm({
  className,
  ...props
}: ComponentProps<'form'>) {
  const router = useRouter();

  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    updatePassword(data, {
      onSuccess: () => {
        router.push(APP_ROUTES.DASHBOARD);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-start gap-1 text-center">
          <h1 className="text-2xl font-bold">Восстановление пароля</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Смените пароль для доступа к аккаунту
          </p>
        </div>

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Новый пароль</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="********"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Подтверждение пароля
              </FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="********"
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
            Сменить пароль
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
