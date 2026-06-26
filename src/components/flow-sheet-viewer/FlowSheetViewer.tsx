'use client';

import { Clock, ExternalLink } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { useFlowStore } from '@/store/useFlowStore';

export function FlowSheetViewer() {
  const activeElement = useFlowStore((s) => s.activeElement);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement && activeElement.type === 'node';

  const nodeData = activeElement?.type === 'node' ? activeElement.data : null;

  if (!nodeData) return null;

  const { label, description, emoji, color, timeToLearn, links } = nodeData;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent side="right">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center gap-3">
            {emoji && (
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-xl shadow-xs"
                style={{
                  backgroundColor: color ? `${color}20` : 'var(--muted)',
                }}
              >
                {emoji}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <SheetTitle className="truncate text-xl font-semibold">
                {label || 'Без названия'}
              </SheetTitle>
              <SheetDescription>
                Детальная информация шага карты
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 space-y-6">
          {timeToLearn && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 p-3">
              <Clock className="size-4 text-primary shrink-0" />
              <span>Время на изучение:</span>
              <Badge variant="secondary" className="ml-auto font-medium">
                {timeToLearn}
              </Badge>
            </div>
          )}

          {description && description.trim() && (
            <div className="mb-4">
              <h4 className="text-lg uppercase tracking-wider mb-2">
                Описание шага
              </h4>
              <p className="text-sm text-muted-foreground bg-card px-2 whitespace-pre-wrap ">
                {description}
              </p>
            </div>
          )}

          {links && links.length > 0 && (
            <div>
              <h4 className="text-lg uppercase tracking-wider mb-2">
                Полезные материалы
              </h4>
              <div className="grid gap-2">
                {links.map((link, index) => {
                  if (!link.url) return null;

                  let displayUrl = link.url;
                  try {
                    displayUrl = new URL(link.url).hostname;
                  } catch (_) {}

                  return (
                    <Button
                      variant="link"
                      asChild
                      key={index}
                      className="w-full"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between px-2 text-sm bg-background transition-all "
                      >
                        <span className="truncate text-foreground/80 group-hover:text-foreground group-hover:underline font-medium">
                          {displayUrl}
                        </span>
                        <ExternalLink className="size-4 text-muted-foreground shrink-0 group-hover:text-foreground group-hover:translate-x-0.5 transition-transform ml-auto" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
