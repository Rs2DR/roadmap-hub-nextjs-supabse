import { HexColorPicker } from 'react-colorful';
import { useForm, Controller } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useReactFlow } from '@xyflow/react';

import { EdgeDataSchema } from '@/shcemas/EdgeFormSchema';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';
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

import type { EdgeData } from '@/shcemas/EdgeFormSchema';

interface EdgeEditorFormProps {
  edgeId: string;
  defaultValues: Partial<EdgeData>;
  onClose: () => void;
}

export const EdgeEditorForm = ({
  edgeId,
  defaultValues,
  onClose,
}: EdgeEditorFormProps) => {
  const { setEdges } = useReactFlow();

  const form = useForm<EdgeData>({
    resolver: zodResolver(EdgeDataSchema),
    defaultValues: {
      label: defaultValues.label || '',
      routingType: defaultValues.routingType || 'bezier',
      lineStyle: defaultValues.lineStyle || 'solid',
      color: defaultValues.color || '#999999',
      animated: defaultValues.animated || false,
    },
  });

  const onSubmit = (data: EdgeData) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === edgeId
          ? { ...edge, data: { ...edge.data, ...data } }
          : edge,
      ),
    );
    onClose();
  };

  return (
    <form
      id={`edge-form-${edgeId}`}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col h-full"
    >
      <div className="px-4 flex-1 overflow-y-auto">
        <FieldGroup>
          {/* Текст на связи (Текст трека) */}
          <Controller
            name="label"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edge-label">Текст связи</FieldLabel>
                <Input
                  {...field}
                  id="edge-label"
                  autoComplete="off"
                  placeholder="Например: после изучения основ"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Тип маршрутизации (React Flow типы) */}
          <Controller
            name="routingType"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Тип линии (Routing)</FieldLabel>
                <FieldDescription>
                  Как изгибается линия на графе
                </FieldDescription>
                <ButtonGroup className="w-full">
                  <Button
                    type="button"
                    className="flex-1"
                    variant={field.value === 'bezier' ? 'default' : 'outline'}
                    onClick={() => field.onChange('bezier')}
                  >
                    Smooth (Bezier)
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    variant={
                      field.value === 'smoothstep' ? 'default' : 'outline'
                    }
                    onClick={() => field.onChange('smoothstep')}
                  >
                    SmoothStep
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    variant={field.value === 'straight' ? 'default' : 'outline'}
                    onClick={() => field.onChange('straight')}
                  >
                    Straight
                  </Button>
                </ButtonGroup>
              </Field>
            )}
          />

          {/* Вид стрелки (Сплошная / Пунктирная) */}
          <Controller
            name="lineStyle"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Стиль линии</FieldLabel>
                <ButtonGroup className="w-full">
                  <Button
                    type="button"
                    className="flex-1"
                    variant={field.value === 'solid' ? 'default' : 'outline'}
                    onClick={() => field.onChange('solid')}
                  >
                    Сплошная
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    variant={field.value === 'dashed' ? 'default' : 'outline'}
                    onClick={() => field.onChange('dashed')}
                  >
                    Пунктирная
                  </Button>
                </ButtonGroup>
              </Field>
            )}
          />

          {/* Цвет стрелки */}
          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edge-color">Цвет стрелки</FieldLabel>
                <div className="inline-flex gap-2 w-full">
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
                  <InputGroup className="flex-1">
                    <InputGroupInput
                      value={field.value}
                      onChange={(e) => {
                        const cleaned = e.target.value.replaceAll(
                          /[^\d#A-Fa-f]/g,
                          '',
                        );
                        field.onChange(cleaned);
                      }}
                      id="edge-color"
                      maxLength={7}
                      autoComplete="off"
                      placeholder="#999999"
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

          {/* Анимация линии */}
          <Controller
            name="animated"
            control={form.control}
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="items-center justify-between border p-3 rounded-lg"
              >
                <div>
                  <FieldLabel
                    className="cursor-pointer"
                    htmlFor="edge-animated"
                  >
                    Анимированная связь
                  </FieldLabel>
                  <FieldDescription>
                    Включает движение линии/пунктира
                  </FieldDescription>
                </div>
                <input
                  type="checkbox"
                  id="edge-animated"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      <SheetFooter className="p-4 border-t mt-4">
        <Field orientation="horizontal" className="w-full justify-end">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Сбросить
          </Button>
          <Button type="submit" form={`edge-form-${edgeId}`}>
            Сохранить
          </Button>
        </Field>
      </SheetFooter>
    </form>
  );
};
