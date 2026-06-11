'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePassword } from '@/actions/auth/updatePassword';

import type { ResetPasswordInput } from '@/shcemas/ResetPasswordSchema';

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordInput) => updatePassword(data),

    onSuccess: ({ success }) => {
      if (!success) return;

      toast.success('Пароль успешно обновлен');
    },

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
