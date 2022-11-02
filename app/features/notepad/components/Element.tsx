import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { ImageProps } from './Image';
import { Image } from './Image';

export type ElementProps = {
  attributes: HTMLAttributes<any>;
  children: ReactNode;
  element: {
    align: CSSProperties['textAlign'];
    type: string;
  };
};

type Components = Record<
  string,
  (
    props: ElementProps['attributes'] & { element?: ElementProps['element'] }
  ) => JSX.Element
>;

const components: Components = {
  'block-quote': (props) => (
    <blockquote className='bg-zinc-700 w-fit p-2 rounded-sm ' {...props} />
  ),
  'bulleted-list': (props) => (
    <ul className='list-disc list-inside' {...props} />
  ),
  'heading-one': (props) => <h1 className='font-bold text-3xl' {...props} />,
  'heading-two': (props) => <h2 className='font-bold text-2xl' {...props} />,
  'heading-three': (props) => <h3 className='font-bold text-xl' {...props} />,
  'heading-four': (props) => <h4 className='font-bold text-lg' {...props} />,
  'heading-five': (props) => <h5 className='font-bold text-base' {...props} />,
  'heading-six': (props) => <h6 className='font-bold text-sm' {...props} />,
  'list-item': (props) => <li {...props} />,
  'numbered-list': (props) => (
    <ol className='list-decimal list-inside' {...props} />
  ),
  image: (props) => <Image {...(props as unknown as ImageProps)} />,
  default: (props) => <p className={`${props.className} `} {...props} />,
};

export const Element = ({ element, ...attributes }: ElementProps) => {
  const Component = components[element.type || 'default'];
  return (
    <Component
      {...attributes}
      element={element}
      style={{ textAlign: element.align, position: 'relative' }}
    />
  );
};
