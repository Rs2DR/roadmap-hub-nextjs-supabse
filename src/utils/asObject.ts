export const asObject = (value: unknown): Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Expected object');
  }

  return value as Record<string, unknown>;
};
