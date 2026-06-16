'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePassword } from '@/actions/auth/updatePassword';

export const useUpdatePassword = () => {
  return useMutation(
    mutationOptions(updatePassword, {
      onSuccess: ({ success }) => {
        if (!success) return;

        toast.success('Пароль успешно обновлен');
      },

      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );
};
