'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInWithEmail } from '@/actions/auth/signInWithEmail';

export const useSignInWithEmail = () => {
  return useMutation(
    mutationOptions(signInWithEmail, {
      onSuccess: ({ success }) => {
        if (!success) return;

        toast.success('Вы успешно вошли в аккаунт');
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );
};
