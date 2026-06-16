'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signOut } from '@/actions/auth/signOut';

export const useSignOut = () => {
  return useMutation(
    mutationOptions(signOut, {
      onSuccess: ({ success }) => {
        if (!success) return;

        toast.success('Вы успешно вышли из аккаунта');
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );
};
