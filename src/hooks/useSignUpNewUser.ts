'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signUpNewUser } from '@/actions/auth/signUpNewUser';

import type { SignUpInput } from '@/shcemas/signUpSchema';

export const useSignUpNewUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpInput) => signUpNewUser(data),
    onSuccess: ({ success }) => {
      if (success) router.push('/confirm-email');
    },
    onError: (error) => {
      console.error('Критическая ошибка сети или сервера:', error);
    },
  });
};
