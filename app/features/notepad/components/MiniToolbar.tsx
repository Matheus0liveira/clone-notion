import type { ForwardRefRenderFunction, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import BIcon from 'remixicon-react/BoldIcon';
import ItalicIcon from 'remixicon-react/ItalicIcon';
import UnderlineIcon from 'remixicon-react/UnderlineIcon';
import CodeLineIcon from 'remixicon-react/CodeLineIcon';
import H1Icon from 'remixicon-react/H1Icon';
import H2Icon from 'remixicon-react/H2Icon';
import DoubleQuotesLIcon from 'remixicon-react/DoubleQuotesLIcon';

import { MarkButton } from './MarkButton';
import { BlockButton } from './BlockButton';

export type MiniToolbarProps = HTMLAttributes<HTMLDivElement>;

const MiniToolbarComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  MiniToolbarProps
> = ({ className, ...rest }, forwardRef) => (
  <div
    {...rest}
    ref={forwardRef}
    className={`${className} p-2 border-2 border-zinc-800 mb-8 gap-2 bg-zinc-900 rounded-md`}
    style={{ zIndex: 40 }}
  >
    <MarkButton format='bold' icon={<BIcon />} />
    <MarkButton format='italic' icon={<ItalicIcon />} />
    <MarkButton format='underline' icon={<UnderlineIcon />} />
    <MarkButton format='code' icon={<CodeLineIcon />} />
    <BlockButton format='heading-one' icon={<H1Icon />} />
    <BlockButton format='heading-two' icon={<H2Icon />} />
    <BlockButton format='block-quote' icon={<DoubleQuotesLIcon />} />
  </div>
);

export const MiniToolbar = forwardRef(MiniToolbarComponent);
