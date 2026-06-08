'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signInWithEmail } from '@/actions/auth/signInWithEmail';

import type { SignInInput } from '@/shcemas/signInSchema';

export const useSignInWithEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInInput) => signInWithEmail(data),
    onSuccess: ({ success }) => {
      if (success) router.push('/dashboard');
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
