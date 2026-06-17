'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePassword } from '@/actions/auth/updatePassword';
import { handleActionError } from '@/utils/handleActionError';

export const useUpdatePassword = () => {
  return useMutation(
    mutationOptions(updatePassword, {
      onSuccess: () => {
        toast.success('Пароль успешно обновлен');
      },

      onError: handleActionError,
    }),
  );
};
