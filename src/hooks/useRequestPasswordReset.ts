'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';
import { unwrapAction } from '@/lib/next-safe-actions/unwrapAction';

import type { RequestResetPasswordInput } from '@/shcemas/RequestResetPasswordSchema';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (data: RequestResetPasswordInput) =>
      unwrapAction(requestPasswordReset(data)),

    onSuccess: ({ success }) => {
      if (!success) return;

      toast.info('Мы отправили письмо вам на почту');
    },

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
