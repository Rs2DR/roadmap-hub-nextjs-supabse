'use client';

import type { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { APP_ROUTES, AUTH_ROUTES } from '@/constants/routes';
import { useSignInWithEmail } from '@/hooks/auth/useSignInWithEmail';
import { cn } from '@/lib/utils';
import { SignInSchema } from '@/schemas/auth/SignInSchema';

import type { SignInInput } from '@/schemas/auth/SignInSchema';

export function SignInForm({ className, ...props }: ComponentProps<'form'>) {
  const router = useRouter();

  const { mutate: signIn, isPending } = useSignInWithEmail();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInInput) => {
    signIn(data, {
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
          <h1 className="text-2xl font-bold">Вход в аккаунт</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Добро пожаловать обратно
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
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="********"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="text-right">
                <Link href={AUTH_ROUTES.RESET_PASSWORD}>Забыл пароль?</Link>
              </FieldDescription>
            </Field>
          )}
        />
        <Field>
          <Button type="submit" loading={isPending || isSubmitting}>
            Войти
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            У вас еще нет аккаунта?{' '}
            <Link href={AUTH_ROUTES.SIGN_UP}>Создать</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
