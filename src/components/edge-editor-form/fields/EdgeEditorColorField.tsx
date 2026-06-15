import { HexColorPicker } from 'react-colorful';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { Field, FieldError, FieldLabel } from '@/components/ui/Field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const EdgeEditorColorField = ({ control }: FieldProps<EdgeData>) => (
  <Controller
    name="color"
    control={control}
    render={({
      field: { name, value, onChange },
      fieldState: { invalid, error },
    }) => (
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor={`edge-${name}`}>Цвет стрелки</FieldLabel>
        <div className="inline-flex gap-2 w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                style={{ backgroundColor: value }}
              />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-fit">
              <HexColorPicker color={value} onChange={onChange} />
            </PopoverContent>
          </Popover>
          <InputGroup className="flex-1">
            <InputGroupInput
              value={value}
              onChange={(e) => {
                const cleaned = e.target.value.replaceAll(/[^\d#A-Fa-f]/g, '');
                onChange(cleaned);
              }}
              id={`edge-${name}`}
              maxLength={7}
              autoComplete="off"
              placeholder="#999999"
              aria-invalid={invalid}
            />
            <InputGroupAddon align="inline-end">HEX</InputGroupAddon>
          </InputGroup>
        </div>
        {invalid && <FieldError errors={[error]} />}
      </Field>
    )}
  />
);
