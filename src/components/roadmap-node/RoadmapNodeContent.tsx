import type { CSSProperties } from 'react';

import { darken, lighten } from 'polished';

import type { NodeData } from '@/schemas/NodeDataSchema';

interface RoadmapNodeContentProps {
  data: NodeData;
}

export function RoadmapNodeContent({ data }: RoadmapNodeContentProps) {
  const { emoji, label, description, color } = data;

  const emojiStyles: CSSProperties = {
    backgroundColor: lighten(0.2, color),
    borderColor: darken(0.2, color),
  };

  return (
    <div className="flex items-center justify-between gap-4 text-left w-full max-w-80">
      <div
        className="border flex justify-center items-center size-10 text-2xl rounded-full shrink-0"
        style={emojiStyles}
      >
        {emoji}
      </div>

      <div className="flex flex-col overflow-hidden">
        <div className="inline-flex items-center gap-2">
          <span className="font-semibold text-md">{label}</span>
        </div>

        {description && description.length > 0 && (
          <span className="text-xs text-muted-foreground line-clamp-3 mt-1">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
