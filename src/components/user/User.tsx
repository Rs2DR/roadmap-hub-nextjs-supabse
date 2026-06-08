'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useSignOut } from '@/hooks/useSignOut';
import { getUserQueryOptions } from '@/queries/getUserQueryOptions';

import { Button } from '../ui/Button';

export function User() {
  const { data } = useSuspenseQuery(getUserQueryOptions());
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  if (!data) return null;

  return (
    <div>
      <Button onClick={handleSignOut}>Выйти</Button>

      {JSON.stringify(data)}
    </div>
  );
}
