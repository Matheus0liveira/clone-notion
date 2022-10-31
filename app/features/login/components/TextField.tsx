import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

export type TextFieldProps = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, errorMessage, ...rest }, forwardRef) => {
    return (
      <label
        htmlFor={label}
        className='flex flex-col mb-4 text-slate-900 font-bold'
      >
        <span>{label}</span>
        <input
          {...rest}
          ref={forwardRef}
          id={label}
          className={`p-4 rounded-md bg-slate-100 text-slate-900 font-bold border-2 ${
            errorMessage ? 'border-red-400' : 'border-slate-300'
          }`}
        />
        {errorMessage ? (
          <p className='text-red-400 font-medium'>{errorMessage}</p>
        ) : null}
      </label>
    );
  }
);
