import { memo } from 'react';

import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { Pencil, Trash } from 'lucide-react';

import { useFlowStore } from '@/store/useFlowStore';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';

import type { Edge, EdgeProps } from '@xyflow/react';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';

type RoadmapEdgeData = Edge<EdgeData>;

const RoadmapEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  data,
}: EdgeProps<RoadmapEdgeData>) => {
  const { deleteElements } = useReactFlow();
  const openSidebar = useFlowStore((store) => store.openSidebar);

  const selectedEdgesCount = useStore(
    (state) => state.edges.filter((e) => e.selected).length,
  );

  // 1. Расчет пути в зависимости от routingType
  const routingType = data?.routingType || 'bezier';
  const pathParams = {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  };

  let edgePath = '';
  let labelX = 0;
  let labelY = 0;

  switch (routingType) {
    case 'smoothstep':
      [edgePath, labelX, labelY] = getSmoothStepPath(pathParams);
      break;
    case 'straight':
      [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
      break;
    case 'bezier':
    default:
      [edgePath, labelX, labelY] = getBezierPath(pathParams);
      break;
  }

  const handleDelete = () => {
    deleteElements({ edges: [{ id }] });
  };

  // 2. Стилизация линии
  const defaultColor = data?.color || '#999999';
  const isDashed = data?.lineStyle === 'dashed';
  const isAnimated = data?.animated;

  const edgeStyle: React.CSSProperties = {
    stroke: selected ? '#111111' : defaultColor,
    strokeWidth: selected ? 2 : 1.5,
    // Если линия пунктирная, задаем паттерн (длина штриха, длина пробела)
    strokeDasharray: isDashed ? '6, 6' : undefined,
    transition: 'stroke 0.2s, stroke-width 0.2s',
  };

  // Формируем имя класса для анимации
  const edgeClassName = isAnimated ? 'roadmap-edge-animated' : '';

  return (
    <>
      {/* Внедряем ключевые кадры анимации прямо в компонент, чтобы код был независимым */}
      <style>{`
        @keyframes roadmapDash {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .roadmap-edge-animated {
          animation: roadmapDash 1s linear infinite;
        }
      `}</style>

      {/* Рендер линии */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={edgeStyle}
        className={edgeClassName}
      />

      {/* Интерактивная зона для кликов */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        style={{ cursor: 'pointer' }}
      />

      {/* Панель управления кнопками (Edit/Delete) */}
      {selected && selectedEdgesCount === 1 && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="flex flex-col items-center gap-1"
          >
            <ButtonGroup>
              <Button
                variant="outline"
                size="icon-xs"
                onClick={() => openSidebar({ type: 'edge', id, data })}
              >
                <Pencil size={12} />
              </Button>
              <Button
                variant="destructive"
                className="border-border"
                size="icon-xs"
                onClick={handleDelete}
              >
                <Trash size={12} />
              </Button>
            </ButtonGroup>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(RoadmapEdge);
