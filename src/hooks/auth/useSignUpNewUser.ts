'use client';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signUpNewUser } from '@/actions/auth';
import { handleActionError } from '@/utils/error';

export const useSignUpNewUser = () => {
  return useMutation(
    mutationOptions(signUpNewUser, {
      onError: (error) => {
        toast.error(handleActionError(error));
      },
    }),
  );
};
