'use client';

import { useMutation } from '@tanstack/react-query';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';

export const useRequestPasswordReset = () =>
  useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
  });
