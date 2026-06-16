'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInWithEmail } from '@/actions/auth/signInWithEmail';
import { unwrapAction } from '@/lib/next-safe-actions/unwrapAction';

import type { SignInInput } from '@/shcemas/SignInSchema';

export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: (data: SignInInput) => unwrapAction(signInWithEmail(data)),

    onSuccess: ({ success }) => {
      if (!success) return;

      toast.success('Вы успешно вошли в аккаунт');
    },

    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
