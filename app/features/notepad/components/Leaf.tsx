import type { RenderLeafProps } from 'slate-react';

type CustomLeafProps = {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  title?: boolean;
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const myLeaf = leaf as CustomLeafProps;

  const subTitle = myLeaf.text.startsWith('##');

  if (myLeaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  if (myLeaf.title) {
    children = (
      <h1 {...attributes} className='text-2xl font-bold'>
        {children}
      </h1>
    );
  }
  if (subTitle) {
    children = (
      <h2 {...attributes} className='text-sm font-bold'>
        {children}
      </h2>
    );
  }

  if (myLeaf.code) {
    children = <code {...attributes}>{children}</code>;
  }

  if (myLeaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }

  if (myLeaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
