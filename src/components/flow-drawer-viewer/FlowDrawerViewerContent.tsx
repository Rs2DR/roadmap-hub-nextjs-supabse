import type { FlowNodeElement } from '@/types/react-flow/FlowSheetElement';

interface FloweDrawerViewerContentProps {
  nodeElement: FlowNodeElement | null;
}

export function FlowDrawerViewerContent({
  nodeElement,
}: FloweDrawerViewerContentProps) {
  if (!nodeElement) return null;

  const { description } = nodeElement.data;

  return <div>{description}</div>;
}
