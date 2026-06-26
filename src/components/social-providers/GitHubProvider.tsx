'use client';

import { FaGithub } from 'react-icons/fa6';

import { Button } from '../ui/Button';
import { Field } from '../ui/Field';

export function GitHubProvider() {
  return (
    <Field>
      <Button variant="outline" type="button">
        <FaGithub /> Продолжить с GitHub
      </Button>
    </Field>
  );
}
