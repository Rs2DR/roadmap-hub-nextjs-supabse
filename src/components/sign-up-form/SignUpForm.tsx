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
import { useSignUpNewUser } from '@/hooks/useSignUpNewUser';
import { cn } from '@/lib/utils';
import { signUpSchema } from '@/shcemas/signUpSchema';

import { SocialProviders } from '../social-providers';

import type { SignUpInput } from '@/shcemas/signUpSchema';

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { mutate } = useSignUpNewUser();
  const { handleSubmit, control } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpInput) => {
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
          <h1 className="text-2xl font-bold">Регистрация</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Создайте аккаунт для начала работы
          </p>
        </div>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Имя</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="Иван"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
          <Button type="submit">Зарегестрироваться</Button>
        </Field>
        <SocialProviders />
        <Field>
          <FieldDescription className="px-6 text-center">
            У вас уже есть аккаунт? <Link href="/sign-in">Войти</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

