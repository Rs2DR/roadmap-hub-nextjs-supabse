'use client';

import { useQueryState } from 'nuqs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

type Option = {
  label: string;
  value: string;
};

interface QuerySelectProps {
  paramKey: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export function QuerySelect({
  paramKey,
  options,
  defaultValue,
  placeholder,
  className,
}: QuerySelectProps) {
  const [value, setValue] = useQueryState(paramKey, {
    defaultValue: defaultValue ?? '',
    clearOnDefault: true,
  });

  return (
    <Select value={value} onValueChange={(v) => setValue(v)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
