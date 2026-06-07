'use client';

import { useMutation } from '@tanstack/react-query';

import { signUpNewUser } from '@/actions/auth/signUpNewUser';

import type { SignUpInput } from '@/shcemas/signUpSchema';

export const useSignUpNewUser = () => {
  return useMutation({
    mutationFn: (data: SignUpInput) => signUpNewUser(data),
  });
};

