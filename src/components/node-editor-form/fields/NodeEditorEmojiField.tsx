import { useState } from 'react';
import { Controller } from 'react-hook-form';

import EmojiPicker from 'emoji-picker-react';

import { Button } from '@/components/ui/Button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

import type { NodeData } from '@/schemas/NodeDataSchema';
import type { FieldProps } from '@/types/FieldProps';

export const NodeEditorEmojiField = ({ control }: FieldProps<NodeData>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      name="emoji"
      control={control}
      render={({
        field: { value, onChange, name },
        fieldState: { invalid, error },
      }) => (
        <Field
          orientation="horizontal"
          className="items-center border p-3 rounded-lg gap-4"
          data-invalid={invalid}
        >
          <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="node-emoji"
                className="size-14 text-3xl"
              >
                {value}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 border-none w-fit">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  onChange(emojiData.emoji);
                  setIsOpen(false);
                }}
                lazyLoadEmojis={true}
                searchDisabled
                skinTonesDisabled
                height={380}
                width={324}
              />
            </PopoverContent>
          </Popover>
          <div>
            <FieldLabel htmlFor={`node-${name}`}>Иконка</FieldLabel>
            <FieldDescription>
              Будет отображаться в заголовке узла на карте
            </FieldDescription>
          </div>
          {invalid && <FieldError errors={[error]} />}
        </Field>
      )}
    />
  );
};
