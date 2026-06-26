import { FieldSeparator } from '../ui/Field';

import { GitHubProvider } from './GitHubProvider';

export function SocialProviders() {
  return (
    <>
      <FieldSeparator>Войти через</FieldSeparator>
      <GitHubProvider />
    </>
  );
}

