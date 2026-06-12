'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signOut } from '@/actions/auth/signOut';

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOut(),

    onSuccess: ({ success }) => {
      if (!success) return;

      toast.success('Вы успешно вышли из аккаунта');
    },

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
