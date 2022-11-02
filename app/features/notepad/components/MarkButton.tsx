import type { ReactNode } from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '../utils';
import { Button } from './Button';

export type MarkButtonProps = {
  format: string;
  icon: ReactNode;
};

export const MarkButton = ({ format, icon }: MarkButtonProps) => {
  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <>{icon}</>
    </Button>
  );
};
