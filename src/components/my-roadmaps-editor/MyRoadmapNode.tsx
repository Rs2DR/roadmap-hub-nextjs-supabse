import { memo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { Handle, Position, NodeToolbar, useReactFlow } from '@xyflow/react';
import { Pencil, Trash } from 'lucide-react';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/InputGroup';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet';
import { Textarea } from '../ui/Textarea';

import type { Node, NodeProps } from '@xyflow/react';

type NodeLabel = Node<{ label: string }, 'text'>;

const MyRoadmapNode = ({ id, data, selected }: NodeProps<NodeLabel>) => {
  const [color, setColor] = useState('#aabbcc');
  const { deleteElements } = useReactFlow();

  const isRootNode = id === 'root';

  const handleDelete = () => {
    if (isRootNode) return;

    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="react-flow__node-default">
      <NodeToolbar isVisible={selected} position={Position.Right}>
        <ButtonGroup orientation="vertical">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Редактор узла</SheetTitle>
                <SheetDescription>
                  Здесь вы можете оформить узел Roadmap и добавить нужную
                  информацию
                </SheetDescription>

                <div className="flex flex-col gap-4 py-8">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="node-title">Название</FieldLabel>
                      <FieldDescription>
                        Короткое название узла (отображается на карточке)
                      </FieldDescription>
                      <Input
                        id="node-title"
                        autoComplete="off"
                        placeholder="Основы JavaScript"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="node-description">
                        Описание
                      </FieldLabel>
                      <FieldDescription>
                        Подробное описание или заметки для этого узла
                      </FieldDescription>
                      <Textarea
                        id="node-description"
                        autoComplete="off"
                        placeholder="Что нужно изучить: переменные, функции, циклы..."
                        className="min-h-32 max-h-40"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="node-color">Цвет</FieldLabel>
                      <FieldDescription>
                        Выбери цвет для этого узла
                      </FieldDescription>

                      <div>
                        <InputGroup>
                          <InputGroupInput
                            id="node-color"
                            autoComplete="off"
                            placeholder="#0000"
                            className="min-h-32 max-h-40"
                          />
                          <InputGroupAddon align="inline-end">
                            HEX
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                    </Field>
                  </FieldGroup>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          {!isRootNode && (
            <Button
              variant="destructive"
              className="border-border"
              size="icon"
              onClick={handleDelete}
            >
              <Trash />
            </Button>
          )}
        </ButtonGroup>
      </NodeToolbar>
      {!isRootNode && <Handle type="target" position={Position.Top} />}
      <div>{data.label as string}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
export default memo(MyRoadmapNode);
