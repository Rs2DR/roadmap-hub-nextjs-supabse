import { Controller } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

import type { NodeData } from '@/shcemas/NodeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const NodeEditorTimeField = ({ control }: FieldProps<NodeData>) => (
  <Controller
    name="timeToLearn"
    control={control}
    render={({ field, fieldState: { invalid, error } }) => {
      const { name } = field;

      return (
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor={`node-${name}`}>Время на изучение</FieldLabel>
          <FieldDescription>Сколько времени уйдет на изучение</FieldDescription>
          <Input
            {...field}
            id={`node-${name}`}
            type="time"
            aria-invalid={invalid}
          />
          {invalid && <FieldError errors={[error]} />}
        </Field>
      );
    }}
  />
);
