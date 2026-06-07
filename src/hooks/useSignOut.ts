'use client';

import { useMutation } from '@tanstack/react-query';

import { signOut } from '@/actions/auth/signOut';

export const useSignOut = () =>
  useMutation({
    mutationFn: () => signOut(),
  });
