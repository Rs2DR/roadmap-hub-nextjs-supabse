'use client';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { useSignInWithEmail } from '@/hooks/useSignInWithEmail';
import { cn } from '@/lib/utils';
import { signInSchema } from '@/shcemas/signInSchema';

import { SocialProviders } from '../social-providers';

import type { SignInInput } from '@/shcemas/signInSchema';

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { mutate } = useSignInWithEmail();
  const { handleSubmit, control } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInInput) => {
    mutate(data);
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
            </Field>
          )}
        />
        <Field>
          <Button type="submit">Войти</Button>
        </Field>
        <SocialProviders />
        <Field>
          <FieldDescription className="px-6 text-center">
            У вас еще нет фккаунта? <Link href="/sign-up">Создать</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

