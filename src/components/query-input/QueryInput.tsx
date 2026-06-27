'use client';

import type { ChangeEvent } from 'react';
import { useId, useMemo, useState } from 'react';

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
  paramKey: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  debounceMs?: number;
};

export function QueryInput({
  paramKey,
  label = 'Поиск',
  placeholder = 'Поиск...',
  maxLength = 100,
  debounceMs = 300,
}: QueryInputProps) {
  const id = useId();

  const [urlValue, setUrlValue] = useQueryState(paramKey, {
    defaultValue: '',
    clearOnDefault: true,
  });

  const [inputValue, setInputValue] = useState(urlValue);

  const syncToUrl = useMemo(
    () =>
      debounce((value: string) => {
        setUrlValue(value);
      }, debounceMs),
    [setUrlValue, debounceMs],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let nextValue = e.target.value;

    if (nextValue.length > maxLength) {
      nextValue = nextValue.slice(0, maxLength);
    }

    setInputValue(nextValue);
    syncToUrl(nextValue);
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
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </InputGroup>
    </Field>
  );
}
