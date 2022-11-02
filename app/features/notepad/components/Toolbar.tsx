import type { ForwardRefRenderFunction, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import BIcon from 'remixicon-react/BoldIcon';
import ItalicIcon from 'remixicon-react/ItalicIcon';
import UnderlineIcon from 'remixicon-react/UnderlineIcon';
import CodeLineIcon from 'remixicon-react/CodeLineIcon';
import H1Icon from 'remixicon-react/H1Icon';
import H2Icon from 'remixicon-react/H2Icon';
import DoubleQuotesLIcon from 'remixicon-react/DoubleQuotesLIcon';
import ListOrderedIcon from 'remixicon-react/ListOrderedIcon';
import ListUnorderedIcon from 'remixicon-react/ListUnorderedIcon';
import AlignLeftIcon from 'remixicon-react/AlignLeftIcon';
import AlignCenterIcon from 'remixicon-react/AlignCenterIcon';
import AlignRightIcon from 'remixicon-react/AlignRightIcon';
import AlignJustifyIcon from 'remixicon-react/AlignJustifyIcon';

import { MarkButton } from './MarkButton';
import { BlockButton } from './BlockButton';

export type ToolbarProps = HTMLAttributes<HTMLDivElement>;

const ToolbarComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  ToolbarProps
> = ({ className, ...rest }, forwardRef) => (
  <div
    {...rest}
    ref={forwardRef}
    className='p-4 border-b-2 border-zinc-800 flex mb-8 gap-2'
  >
    <MarkButton format='bold' icon={<BIcon />} />
    <MarkButton format='italic' icon={<ItalicIcon />} />
    <MarkButton format='underline' icon={<UnderlineIcon />} />
    <MarkButton format='code' icon={<CodeLineIcon />} />
    <BlockButton format='heading-one' icon={<H1Icon />} />
    <BlockButton format='heading-two' icon={<H2Icon />} />
    <BlockButton format='block-quote' icon={<DoubleQuotesLIcon />} />
    <BlockButton format='numbered-list' icon={<ListOrderedIcon />} />
    <BlockButton format='bulleted-list' icon={<ListUnorderedIcon />} />
    <BlockButton format='left' icon={<AlignLeftIcon />} />
    <BlockButton format='center' icon={<AlignCenterIcon />} />
    <BlockButton format='right' icon={<AlignRightIcon />} />
    <BlockButton format='justify' icon={<AlignJustifyIcon />} />
  </div>
);

export const Toolbar = forwardRef(ToolbarComponent);
