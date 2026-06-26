import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { Field, FieldLabel } from '@/components/ui/Field';
import { EDGE_LINE_STYLES } from '@/constants/edge';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const EdgeEditorStyleField = ({ control }: FieldProps<EdgeData>) => (
  <Controller
    name="lineStyle"
    control={control}
    render={({ field: { value, onChange } }) => (
      <Field>
        <FieldLabel>Стиль линии</FieldLabel>
        <ButtonGroup className="w-full">
          {Object.entries(EDGE_LINE_STYLES).map(([key, label]) => (
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
