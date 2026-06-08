'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';

import type { RequestResetPasswordInput } from '@/shcemas/requestResetPasswordSchema';

export const useRequestPasswordReset = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RequestResetPasswordInput) => requestPasswordReset(data),
    onSuccess: ({ success }) => {
      if (success) router.push('/sign-in');
    },
  });
};
