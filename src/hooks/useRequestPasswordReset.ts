'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { requestPasswordReset } from '@/actions/auth/requestPasswordReset';
import { handleActionError } from '@/utils/handleActionError';

export const useRequestPasswordReset = () => {
  return useMutation(
    mutationOptions(requestPasswordReset, {
      onSuccess: () => {
        toast.info('Мы отправили письмо вам на почту');
      },

      onError: handleActionError,
    }),
  );
};
