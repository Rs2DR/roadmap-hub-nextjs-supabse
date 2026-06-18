import { Controller, useFieldArray } from 'react-hook-form';

import { LinkIcon, Plus, Trash } from 'lucide-react';

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

import type { NodeData } from '@/shcemas/NodeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const NodeEditorLinksField = ({ control }: FieldProps<NodeData>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  return (
    <Field>
      <FieldLabel>Полезные ссылки</FieldLabel>
      <FieldDescription>Ссылки для изучения темы</FieldDescription>
      <div className="flex flex-col gap-3 mt-2">
        {fields.map((fieldItem, index) => (
          <Controller
            key={fieldItem.id}
            name={`links.${index}.url`}
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <div className="flex flex-col gap-1">
                <div
                  className="inline-flex gap-2 w-full"
                  data-invalid={invalid}
                >
                  <InputGroup className="flex-1">
                    <InputGroupAddon>
                      <LinkIcon size={16} />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      autoComplete="off"
                      placeholder="https://..."
                      aria-invalid={invalid}
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
                {invalid && <FieldError errors={[error]} />}
              </div>
            )}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append({ url: '' })}
        >
          <Plus className="mr-2 h-4 w-4" /> Добавить ссылку
        </Button>
      </div>
    </Field>
  );
};
