import type { ReactNode } from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from '../utils';
import { Button } from './Button';

export type BlockButtonProps = {
  format: string;
  icon: ReactNode;
};

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const BlockButton = ({ format, icon }: BlockButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};
