import { Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/Field';

import type { EdgeData } from '@/schemas/EdgeDataSchema';
import type { FieldProps } from '@/types/form/FieldProps';

export const EdgeEditorAnimatedField = ({ control }: FieldProps<EdgeData>) => (
  <Controller
    name="animated"
    control={control}
    render={({ field: { name, value, onChange } }) => (
      <Field
        orientation="horizontal"
        className="items-center justify-between border p-3 rounded-lg"
      >
        <div>
          <FieldLabel className="cursor-pointer" htmlFor={`edge-${name}`}>
            Анимированная связь
          </FieldLabel>
          <FieldDescription>Включает движение линии/пунктира</FieldDescription>
        </div>
        <Checkbox
          id={`edge-${name}`}
          name={`edge-${name}`}
          checked={value}
          onCheckedChange={(checked) => onChange(checked)}
        />
      </Field>
    )}
  />
);
