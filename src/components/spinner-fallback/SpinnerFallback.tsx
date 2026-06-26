import { Spinner } from '@/components/ui/Spinner';

export function SpinnerFallback() {
  return (
    <div className="relative min-w-full min-h-full">
      <Spinner className="size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
