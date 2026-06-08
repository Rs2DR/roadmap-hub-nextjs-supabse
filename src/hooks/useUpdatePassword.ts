'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { updatePassword } from '@/actions/auth/updatePassword';

import type { ResetPasswordInput } from '@/shcemas/resetPasswordSchema';

export const useUpdatePassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordInput) => updatePassword(data),
    onSuccess: ({ success }) => {
      if (success) {
        router.push('/dashboard');
        toast.success('Пароль успешно обновлен');
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
