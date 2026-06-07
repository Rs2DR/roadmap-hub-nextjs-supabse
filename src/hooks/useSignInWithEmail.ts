'use client';

import { useMutation } from '@tanstack/react-query';

import { signInWithEmail } from '@/actions/auth/signInWithEmail';

import type { SignInInput } from '@/shcemas/signInSchema';

export const useSignInWithEmail = () =>
  useMutation({
    mutationFn: (data: SignInInput) => signInWithEmail(data),
    onError: (error) => {
      console.log(error.message);
    },
  });
