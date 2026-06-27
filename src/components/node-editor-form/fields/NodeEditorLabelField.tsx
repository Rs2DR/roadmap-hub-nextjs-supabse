import { Controller } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

import type { NodeData } from '@/schemas/roadmap/NodeDataSchema';
import type { FieldProps } from '@/types/form/FieldProps';

export const NodeEditorLabelField = ({ control }: FieldProps<NodeData>) => (
  <Controller
    name="label"
    control={control}
    render={({ field, fieldState: { invalid, error } }) => {
      const { name } = field;

      return (
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor={`node-${name}`}>Название</FieldLabel>
          <FieldDescription>
            Короткое название узла (отображается на карточке)
          </FieldDescription>
          <Input
            {...field}
            id={`node-${name}`}
            autoComplete="off"
            placeholder="Основы JavaScript"
            aria-invalid={invalid}
          />
          {invalid && <FieldError errors={[error]} />}
        </Field>
      );
    }}
  />
);
