'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signOut } from '@/actions/auth/signOut';

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: ({ success }) => {
      if (success) {
        router.push('/');
        toast.success('Вы успешно вышли из аккаунта');
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
