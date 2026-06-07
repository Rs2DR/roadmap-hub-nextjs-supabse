'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useRequestPasswordReset } from '@/hooks/useRequestPasswordReset';
import { useSignOut } from '@/hooks/useSignOut';
import { getUserQueryOptions } from '@/queries/getUserQueryOptions';

import { Button } from '../ui/Button';

export function User() {
  const { data } = useSuspenseQuery(getUserQueryOptions());
  const { mutate: signOut } = useSignOut();
  const { mutate: resetPassword } = useRequestPasswordReset();

  const handleSignOut = () => {
    signOut();
  };

  const handleReset = () => {
    resetPassword('sedgoil6@gmail.com');
  };

  if (!data) return null;

  return (
    <div>
      <Button onClick={handleSignOut}>Выйти</Button>
      <Button onClick={handleReset}>Поменять пароль</Button>
      {JSON.stringify(data)}
    </div>
  );
}
