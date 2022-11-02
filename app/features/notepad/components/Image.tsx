import type { Node } from 'slate';
import { Transforms } from 'slate';
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react';
import { Button } from './Button';
import DeleteBin6LineIcon from 'remixicon-react/DeleteBin6LineIcon';
import type { HTMLAttributes, ReactNode } from 'react';

export type ImageProps = {
  attributes: HTMLAttributes<HTMLDivElement>;
  children: ReactNode;
  element: {
    align: 'left' | 'center' | 'right' | 'justify';
    url: string;
  };
};

export const Image = ({ attributes, children, element }: ImageProps) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(
    editor as ReactEditor,
    element as unknown as Node
  );
  const selected = useSelected();
  const focused = useFocused();

  const align = element.align || 'left';

  const alignToRight = align === 'right' && 'ml-auto';
  const alignToLeft = align === 'left' && 'mr-auto';
  const alignToCenter =
    (align === 'justify' || align === 'center') && 'mx-auto';

  return (
    <div {...attributes}>
      {children}
      <div
        className={`relative ${!!alignToLeft && 'float-left'} ${
          !!alignToRight && 'float-right'
        }`}
      >
        <img
          src={element.url}
          alt='#'
          className={`block max-w-full max-h-80 cursor-pointer ${
            selected && focused ? 'border-2 border-gray-700' : 'none'
          } ${alignToRight} ${alignToLeft} ${alignToCenter}`}
        />
        <Button
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={`${
            selected && focused ? 'opacity-1' : 'opacity-0'
          } absolute top-1 left-1`}
        >
          <DeleteBin6LineIcon />
        </Button>
      </div>
    </div>
  );
};
