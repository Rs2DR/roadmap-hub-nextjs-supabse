'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';
import { AUTH_ROUTES } from '@/constants/routes';

import type { RequestResetPasswordInput } from '@/shcemas/RequestResetPasswordSchema';

export const useRequestPasswordReset = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RequestResetPasswordInput) => requestPasswordReset(data),
    onSuccess: ({ success }) => {
      if (success) {
        router.push(AUTH_ROUTES.SIGN_IN);
        toast.info('Мы отправили письмо вам на почту');
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
