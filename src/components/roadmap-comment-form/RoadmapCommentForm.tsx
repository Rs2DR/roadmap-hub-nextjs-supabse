'use client';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Field, FieldError } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';
import { useAddCommentOnRoadmap } from '@/hooks/roadmap/useAddCommentOnRoadmap';
import { CreateCommentSchema } from '@/schemas/roadmap/CreateCommentSchema';

import type { CreateCommentInput } from '@/schemas/roadmap/CreateCommentSchema';

interface RoadmapCommentFormProps {
  roadmapId: string;
}

export function RoadmapCommentForm({ roadmapId }: RoadmapCommentFormProps) {
  const { mutate: addComment, isPending } = useAddCommentOnRoadmap({
    roadmapId,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateCommentInput>({
    mode: 'onSubmit',
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      roadmapId,
      content: '',
    },
  });

  const onSubmit = (data: CreateCommentInput) => {
    addComment(
      { roadmapId: data.roadmapId, content: data.content },
      {
        onSuccess: () => {
          reset({ roadmapId, content: '' });
        },
      },
    );
  };

  const isLoading = isPending || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border-t bg-background flex flex-col gap-1"
    >
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center gap-2">
              <Field className="flex-1">
                <Input
                  {...field}
                  id="content"
                  placeholder="Оставить комментарий..."
                  disabled={isLoading}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                />
              </Field>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                loading={isLoading}
              >
                <Send className="size-4" />
              </Button>
            </div>
            {fieldState.invalid && (
              <FieldError className="px-1" errors={[fieldState.error]} />
            )}
          </div>
        )}
      />
    </form>
  );
}
