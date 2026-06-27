import { HexColorPicker } from 'react-colorful';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';
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

import type { NodeData } from '@/schemas/NodeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const NodeEditorColorField = ({ control }: FieldProps<NodeData>) => (
  <Controller
    name="color"
    control={control}
    render={({
      field: { name, value, onChange },
      fieldState: { invalid, error },
    }) => (
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor={`node-${name}`}>Цвет</FieldLabel>
        <FieldDescription>Выбери цвет для этого узла</FieldDescription>
        <div className="inline-flex gap-2">
          <Popover modal={true}>
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
          <InputGroup>
            <InputGroupInput
              value={value}
              onChange={(e) => {
                const cleaned = e.target.value.replaceAll(/[^\d#A-Fa-f]/g, '');
                onChange(cleaned);
              }}
              id={`node-${name}`}
              maxLength={9}
              autoComplete="off"
              placeholder="#000000"
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
