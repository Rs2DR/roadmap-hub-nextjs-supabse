'use client';

import type { ChangeEvent } from 'react';

import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Field, FieldLabel } from '../ui/Field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/InputGroup';

export function FilterInput() {
  const [filterValue, setFilterValue] = useQueryState('filter', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const handleChangeFilterValue = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterValue(e.target.value);

  return (
    <Field className="grow">
      <FieldLabel htmlFor="input-search-roadmap">Найди свой Roadmap</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          id="input-search-roadmap"
          placeholder="Поиск..."
          value={filterValue}
          onChange={handleChangeFilterValue}
        />
      </InputGroup>
    </Field>
  );
}
