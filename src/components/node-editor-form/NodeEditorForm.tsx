import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useReactFlow } from '@xyflow/react';

import {
  NodeEditorColorField,
  NodeEditorDescriptionField,
  NodeEditorEmojiField,
  NodeEditorLabelField,
  NodeEditorLinksField,
} from '@/components/node-editor-form/fields';
import { Button } from '@/components/ui/Button';
import { Field, FieldGroup } from '@/components/ui/Field';
import { SheetFooter } from '@/components/ui/Sheet';
import { NodeDataSchema } from '@/shcemas/NodeDataSchema';

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

  const { control, handleSubmit } = useForm<NodeData>({
    resolver: zodResolver(NodeDataSchema),
    defaultValues: {
      label: defaultValues.label || '',
      description: defaultValues.description || '',
      emoji: defaultValues.emoji || '😃',
      color: defaultValues.color || '#aabbcc',
      timeToLearn: defaultValues.timeToLearn || '',
      links: defaultValues.links || [],
    },
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full"
    >
      <div className="px-4 flex-1 overflow-y-auto">
        <FieldGroup>
          <NodeEditorLabelField control={control} />
          <NodeEditorDescriptionField control={control} />
          <NodeEditorEmojiField control={control} />
          <NodeEditorColorField control={control} />
          <NodeEditorLinksField control={control} />
        </FieldGroup>
      </div>

      <SheetFooter className="p-4 border-t mt-4">
        <Button type="submit" form={`node-form-${nodeId}`}>
          Сохранить
        </Button>
      </SheetFooter>
    </form>
  );
};
