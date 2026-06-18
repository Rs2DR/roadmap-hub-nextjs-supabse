export const assertArray = (value: unknown, name: string): unknown[] => {
  if (!Array.isArray(value)) {
    throw new Error(`${name} must be array`);
  }
  return value;
};
