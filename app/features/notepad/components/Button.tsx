import type { ForwardRefRenderFunction, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

export type ButtonProps = {
  active: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = ({ className, active, ...props }: ButtonProps, forwardRef) => (
  <button
    {...props}
    ref={forwardRef}
    className={`${className} cursor-pointer p-1 rounded-sm  transition-all hover:bg-zinc-400 ${
      active && 'bg-zinc-600'
    }`}
  />
);

export const Button = forwardRef(ButtonComponent);
