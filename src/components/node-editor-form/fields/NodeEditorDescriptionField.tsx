import { Controller } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';
import { Textarea } from '@/components/ui/Textarea';

import type { NodeData } from '@/shcemas/NodeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const NodeEditorDescriptionField = ({
  control,
}: FieldProps<NodeData>) => (
  <Controller
    name="description"
    control={control}
    render={({ field, fieldState: { invalid, error } }) => {
      const { name } = field;

      return (
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor={`node-${name}`}>Описание</FieldLabel>
          <FieldDescription>
            Подробное описание или заметки для этого узла
          </FieldDescription>
          <Textarea
            {...field}
            id={`node-${name}`}
            autoComplete="off"
            className="min-h-32 max-h-40"
            placeholder="Что нужно изучить: переменные, функции, циклы..."
            aria-invalid={invalid}
          />
          {invalid && <FieldError errors={[error]} />}
        </Field>
      );
    }}
  />
);
