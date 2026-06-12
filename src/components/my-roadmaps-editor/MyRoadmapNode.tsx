import type { ChangeEvent } from 'react';
import { memo, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useHotkeys } from 'react-hotkeys-hook';

import { Handle, Position, NodeToolbar, useReactFlow } from '@xyflow/react';
import { Copy, Link, Pencil, Plus, Trash, X } from 'lucide-react';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/Field';
import { Input } from '../ui/Input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/InputGroup';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet';
import { Textarea } from '../ui/Textarea';

import type { Node, NodeProps } from '@xyflow/react';

type NodeLabel = Node<{ label: string }, 'text'>;

const MyRoadmapNode = ({ id, data, selected }: NodeProps<NodeLabel>) => {
  const [color, setColor] = useState('#aabbcc');

  const { deleteElements, getNode, setNodes } = useReactFlow();

  const isRootNode = id === 'root';

  const handleDelete = () => {
    if (isRootNode) return;

    deleteElements({ nodes: [{ id }] });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const cleaned = value.replaceAll(/[^\d#A-Fa-f]/g, '');

    setColor(cleaned);
  };

  const handleCopy = () => {
    const node = getNode(id);
    if (!node) return;

    const newId = crypto.randomUUID();

    setNodes((nds) => [
      ...nds,
      {
        ...node,
        id: newId,
        position: {
          x: node.position.x,
          y: node.position.y + 100,
        },
        selected: false,
      },
    ]);
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

                <FieldGroup className="py-8">
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
                    <FieldLabel htmlFor="node-description">Описание</FieldLabel>
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

                    <div className="inline-flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            style={{ backgroundColor: color }}
                          />
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-fit">
                          <HexColorPicker color={color} onChange={setColor} />
                        </PopoverContent>
                      </Popover>
                      <InputGroup>
                        <InputGroupInput
                          id="node-color"
                          value={color}
                          onChange={handleChange}
                          maxLength={9}
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
                  <Field>
                    <FieldLabel htmlFor="node-time-to-learn">
                      Время на изучение
                    </FieldLabel>
                    <FieldDescription>
                      Сколько времени уйдет на изучение
                    </FieldDescription>
                    <Input
                      id="node-time-to-learn"
                      autoComplete="off"
                      type="time"
                      placeholder="Что нужно изучить: переменные, функции, циклы..."
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="node-useful-links">
                      Полезные ссылки
                    </FieldLabel>
                    <FieldDescription>
                      Сссылки для изучения темы
                    </FieldDescription>

                    <div className="inline-flex gap-2">
                      <InputGroup>
                        <InputGroupAddon>
                          <Link />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="node-color"
                          autoComplete="off"
                          placeholder="http://localhost:3000/dashboard"
                          className="min-h-32 max-h-40"
                        />
                      </InputGroup>
                      <Button variant="outline" size="icon">
                        <Plus />
                      </Button>
                    </div>
                  </Field>
                </FieldGroup>
              </SheetHeader>
              <SheetFooter>
                <div className="inline-flex justify-between">
                  <Button variant="destructive">
                    <Trash />
                    Удалить
                  </Button>
                  <Button>Сохранить</Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy />
          </Button>
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
