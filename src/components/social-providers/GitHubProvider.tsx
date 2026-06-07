'use client';

import { FaGithub } from 'react-icons/fa6';

import { useSignInWithGitHub } from '@/hooks/useSignInWithGitHub';

import { Button } from '../ui/Button';
import { Field } from '../ui/Field';

export function GitHubProvider() {
  const { mutate } = useSignInWithGitHub();

  const handleSignIn = () => {
    mutate();
  };

  return (
    <Field>
      <Button variant="outline" type="button" onClick={handleSignIn}>
        <FaGithub />
        Продолжить с GitHub
      </Button>
    </Field>
  );
}

