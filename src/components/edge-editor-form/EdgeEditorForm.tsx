import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useReactFlow } from '@xyflow/react';

import {
  EdgeEditorAnimatedField,
  EdgeEditorColorField,
  EdgeEditorRoutingField,
  EdgeEditorStyleField,
} from '@/components/edge-editor-form/fields';
import { Button } from '@/components/ui/Button';
import { FieldGroup } from '@/components/ui/Field';
import { SheetFooter } from '@/components/ui/Sheet';
import { EdgeDataSchema } from '@/schemas/EdgeDataSchema';

import type { EdgeData } from '@/schemas/EdgeDataSchema';

interface EdgeEditorFormProps {
  edgeId: string;
  defaultValues: Partial<EdgeData> | undefined;
  onClose: () => void;
}

export const EdgeEditorForm = ({
  edgeId,
  defaultValues,
  onClose,
}: EdgeEditorFormProps) => {
  const { setEdges } = useReactFlow();

  const { control, handleSubmit } = useForm<EdgeData>({
    resolver: zodResolver(EdgeDataSchema),
    defaultValues: {
      routingType: defaultValues?.routingType || 'bezier',
      lineStyle: defaultValues?.lineStyle || 'solid',
      color: defaultValues?.color || '#999999',
      animated: defaultValues?.animated || false,
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
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full"
    >
      <div className="px-4 flex-1 overflow-y-auto">
        <FieldGroup>
          <EdgeEditorRoutingField control={control} />
          <EdgeEditorStyleField control={control} />
          <EdgeEditorColorField control={control} />
          <EdgeEditorAnimatedField control={control} />
        </FieldGroup>
      </div>

      <SheetFooter className="p-4 border-t mt-4">
        <Button type="submit" form={`edge-form-${edgeId}`}>
          Сохранить
        </Button>
      </SheetFooter>
    </form>
  );
};
