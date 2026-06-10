'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signUpNewUser } from '@/actions/auth/signUpNewUser';
import { AUTH_ROUTES } from '@/constants/routes';

import type { SignUpInput } from '@/shcemas/SignUpSchema';

export const useSignUpNewUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpInput) => signUpNewUser(data),
    onSuccess: ({ success }) => {
      if (success) router.push(AUTH_ROUTES.CONFIRM_EMAIL);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
