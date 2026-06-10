'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';

import type { RequestResetPasswordInput } from '@/shcemas/RequestResetPasswordSchema';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (data: RequestResetPasswordInput) => requestPasswordReset(data),

    onSuccess: ({ success }) => {
      if (!success) return;

      toast.info('Мы отправили письмо вам на почту');
    },

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
