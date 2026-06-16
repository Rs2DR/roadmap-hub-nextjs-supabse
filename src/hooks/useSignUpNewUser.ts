'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signUpNewUser } from '@/actions/auth/signUpNewUser';
import { unwrapAction } from '@/lib/next-safe-actions/unwrapAction';

import type { SignUpInput } from '@/shcemas/SignUpSchema';

export const useSignUpNewUser = () => {
  return useMutation({
    mutationFn: (data: SignUpInput) => unwrapAction(signUpNewUser(data)),

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
