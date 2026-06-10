'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signInWithEmail } from '@/actions/auth/signInWithEmail';
import { APP_ROUTES } from '@/constants/routes';

import type { SignInInput } from '@/shcemas/SignInSchema';

export const useSignInWithEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInInput) => signInWithEmail(data),
    onSuccess: ({ success }) => {
      if (success) {
        router.push(APP_ROUTES.DASHBOARD);
        toast.success('Вы успешно вошли в аккаунт');
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
