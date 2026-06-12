'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signUpNewUser } from '@/actions/auth/signUpNewUser';

import type { SignUpInput } from '@/shcemas/SignUpSchema';

export const useSignUpNewUser = () => {
  return useMutation({
    mutationFn: (data: SignUpInput) => signUpNewUser(data),

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
