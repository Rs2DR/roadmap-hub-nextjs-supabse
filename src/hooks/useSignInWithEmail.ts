'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInWithEmail } from '@/actions/auth/signInWithEmail';
import { handleActionError } from '@/utils/handleActionError';

export const useSignInWithEmail = () => {
  return useMutation(
    mutationOptions(signInWithEmail, {
      onSuccess: () => {
        toast.success('Вы успешно вошли в аккаунт');
      },

      onError: handleActionError,
    }),
  );
};
