'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { getUserQueryOptions } from '@/queries/getUserQueryOptions';

export function User() {
  const { data } = useSuspenseQuery(getUserQueryOptions());

  if (!data) return null;

  return <div>{JSON.stringify(data)}</div>;
}

