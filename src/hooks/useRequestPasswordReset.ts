'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';

export const useRequestPasswordReset = () => {
  return useMutation(
    mutationOptions(requestPasswordReset, {
      onSuccess: ({ success }) => {
        if (!success) return;

        toast.info('Мы отправили письмо вам на почту');
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );
};
