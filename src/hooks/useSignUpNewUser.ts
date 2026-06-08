'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signUpNewUser } from '@/actions/auth/signUpNewUser';

import type { SignUpInput } from '@/shcemas/signUpSchema';

export const useSignUpNewUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpInput) => signUpNewUser(data),
    onSuccess: ({ success }) => {
      if (success) router.push('/confirm-email');
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
