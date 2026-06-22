'use client';

import type { ChangeEvent } from 'react';
import { useId, useMemo, useTransition } from 'react';

import debounce from 'lodash-es/debounce';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Field, FieldLabel } from '@/components/ui/Field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';

type QueryInputProps = {
  paramKey?: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  debounceMs?: number;
};

export function QueryInput({
  paramKey = 'filter',
  label = 'Поиск',
  placeholder = 'Поиск...',
  maxLength = 100,
  debounceMs = 300,
}: QueryInputProps) {
  const id = useId();
  const [, startTransition] = useTransition();

  const [value, setValue] = useQueryState(paramKey, {
    defaultValue: '',
    clearOnDefault: true,
  });

  const setValueDebounced = useMemo(
    () =>
      debounce((v: string) => {
        startTransition(() => {
          setValue(v);
        });
      }, debounceMs),
    [setValue, debounceMs],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let nextValue = e.target.value;

    if (nextValue.length > maxLength) {
      nextValue = nextValue.slice(0, maxLength);
    }

    setValueDebounced(nextValue);
  };

  return (
    <Field className="grow">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>

        <InputGroupInput
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
      </InputGroup>
    </Field>
  );
}
