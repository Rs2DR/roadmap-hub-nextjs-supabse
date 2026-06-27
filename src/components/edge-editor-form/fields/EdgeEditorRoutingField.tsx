import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/Field';
import { EDGE_ROUTING_TYPES } from '@/constants/edge';

import type { EdgeData } from '@/schemas/EdgeDataSchema';
import type { FieldProps } from '@/types/form/FieldProps';

export const EdgeEditorRoutingField = ({ control }: FieldProps<EdgeData>) => (
  <Controller
    name="routingType"
    control={control}
    render={({ field: { value, onChange } }) => (
      <Field>
        <FieldLabel>Тип линии (Routing)</FieldLabel>
        <FieldDescription>Как изгибается линия на графе</FieldDescription>
        <ButtonGroup className="w-full">
          {Object.entries(EDGE_ROUTING_TYPES).map(([key, label]) => (
            <Button
              key={key}
              type="button"
              className="flex-1"
              variant={value === key ? 'default' : 'outline'}
              onClick={() => onChange(key)}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Field>
    )}
  />
);
