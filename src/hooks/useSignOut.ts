'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signOut } from '@/actions/auth/signOut';
import { handleActionError } from '@/utils/handleActionError';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(signOut, {
      onSuccess: () => {
        queryClient.clear();

        toast.success('Вы успешно вышли из аккаунта');
      },

      onError: (error) => {
        toast.error(handleActionError(error));
      },
    }),
  );
};
