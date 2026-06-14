import { HexColorPicker } from 'react-colorful';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useReactFlow } from '@xyflow/react';
import { Link as LinkIcon, Plus, Trash } from 'lucide-react';

import { NodeDataSchema } from '@/shcemas/NodeDataSchema';

import { Button } from '../ui/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/Field';
import { Input } from '../ui/Input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/InputGroup';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { SheetFooter } from '../ui/Sheet';
import { Textarea } from '../ui/Textarea';

import type { NodeData } from '@/shcemas/NodeDataSchema';

interface NodeEditorFormProps {
  nodeId: string;
  defaultValues: Partial<NodeData>;
  onClose: () => void;
}

export const NodeEditorForm = ({
  nodeId,
  defaultValues,
  onClose,
}: NodeEditorFormProps) => {
  const { setNodes } = useReactFlow();

  const form = useForm<NodeData>({
    resolver: zodResolver(NodeDataSchema),
    defaultValues: {
      label: defaultValues.label || '',
      description: defaultValues.description || '',
      color: defaultValues.color || '#aabbcc',
      timeToLearn: defaultValues.timeToLearn || '',
      links: defaultValues.links || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const onSubmit = (data: NodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node,
      ),
    );
    onClose();
  };

  return (
    <form
      id={`node-form-${nodeId}`}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col h-full"
    >
      <div className="px-4 flex-1 overflow-y-auto">
        <FieldGroup>
          {/* Название */}
          <Controller
            name="label"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="node-label">Название</FieldLabel>
                <FieldDescription>
                  Короткое название узла (отображается на карточке)
                </FieldDescription>
                <Input
                  {...field}
                  id="node-label"
                  autoComplete="off"
                  placeholder="Основы JavaScript"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Описание */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="node-description">Описание</FieldLabel>
                <FieldDescription>
                  Подробное описание или заметки для этого узла
                </FieldDescription>
                <Textarea
                  {...field}
                  id="node-description"
                  autoComplete="off"
                  className="min-h-32 max-h-40"
                  placeholder="Что нужно изучить: переменные, функции, циклы..."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Цвет */}
          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="node-color">Цвет</FieldLabel>
                <FieldDescription>Выбери цвет для этого узла</FieldDescription>
                <div className="inline-flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        style={{ backgroundColor: field.value }}
                      />
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-fit">
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <InputGroup>
                    <InputGroupInput
                      value={field.value}
                      onChange={(e) => {
                        const cleaned = e.target.value.replaceAll(
                          /[^\d#A-Fa-f]/g,
                          '',
                        );
                        field.onChange(cleaned);
                      }}
                      id="node-color"
                      maxLength={9}
                      autoComplete="off"
                      placeholder="#000000"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-end">HEX</InputGroupAddon>
                  </InputGroup>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Время на изучение */}
          <Controller
            name="timeToLearn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="node-time-to-learn">
                  Время на изучение
                </FieldLabel>
                <FieldDescription>
                  Сколько времени уйдет на изучение
                </FieldDescription>
                <Input
                  {...field}
                  id="node-time-to-learn"
                  type="time"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Полезные ссылки (Массив через Controller) */}
          <Field>
            <FieldLabel>Полезные ссылки</FieldLabel>
            <FieldDescription>Ссылки для изучения темы</FieldDescription>
            <div className="flex flex-col gap-3 mt-2">
              {fields.map((fieldItem, index) => (
                <Controller
                  key={fieldItem.id}
                  name={`links.${index}.url`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <div
                        className="inline-flex gap-2 w-full"
                        data-invalid={fieldState.invalid}
                      >
                        <InputGroup className="flex-1">
                          <InputGroupAddon>
                            <LinkIcon size={16} />
                          </InputGroupAddon>
                          <InputGroupInput
                            {...field}
                            autoComplete="off"
                            placeholder="https://..."
                            aria-invalid={fieldState.invalid}
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
        </FieldGroup>
      </div>

      <SheetFooter className="p-4 border-t mt-4">
        <Field orientation="horizontal" className="w-full justify-end">
          <Button type="submit" form={`node-form-${nodeId}`}>
            Сохранить
          </Button>
        </Field>
      </SheetFooter>
    </form>
  );
};
