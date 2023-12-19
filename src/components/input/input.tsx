import React, { ReactNode } from 'react';
import MaskedInput from 'react-input-mask';
import { Flag, Search } from '@/components/icons';
import classNames from 'classnames';
import { Spacer } from '../spacer';

interface InputProps {
  id?: string;
  label?: string | JSX.Element;
  subLabel?: string;
  placeholder?: string;
  error?: string | number;
  hideLabel?: boolean;
  largeLabel?: boolean;
  min?: string;
  max?: string;
  type?: 'search' | 'date' | 'text' | 'number' | 'phone' | 'password' | 'email';
  value?: string | null;
  className?: string;
  alwaysShowMask?: boolean;
  mask?: string;
  disabled?: boolean;
  readOnly?: boolean;
  smallPrefix?: boolean;
  prefix?: ReactNode;
  onKeyPress?: (event: any) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input: React.FC<InputProps> = ({
  placeholder,
  error,
  onChange,
  id,
  label,
  largeLabel,
  subLabel,
  type = 'text',
  value,
  className,
  onKeyPress,
  disabled,
  mask,
  alwaysShowMask,
  prefix,
  smallPrefix,
  readOnly,
  min,
  max,
}) => {
  const inputBoxError = error
    ? 'border border-secondary-100 bg-secondary-100 bg-opacity-5'
    : 'border border-neutral-200 focus:ring-1 focus:ring-primary-100';

  if (type === 'search') {
    prefix = <Search />;
  }

  if (type === 'phone') {
    mask = '(999) 99 999 9999';
    placeholder = '(233) 024 343 3323';

    className = classNames('bg-neutral-100 bg-opacity-30', className);

    {
      error ? null : (prefix = <Flag />);
    }
  }

  return (
    <div className="w-full flex flex-col">
      {label ? (
        <>
          <label
            className={classNames('font-sans text-neutral-400', {
              'text-lg font-medium': largeLabel,
              'text-sm font-semibold': !largeLabel,
            })}
            htmlFor={id}
          >
            {label}
          </label>
          <Spacer className="h-1" />
        </>
      ) : null}

      {subLabel ? (
        <>
          <p
            className={classNames('font-sans-body text-neutral-400', {
              'text-sm mb-2': largeLabel,
              'text-xs': !largeLabel,
            })}
          >
            {subLabel}
          </p>

          <Spacer className="h-1" />
        </>
      ) : null}

      <div className="relative flex">
        {prefix ? (
          <div
            className={classNames('absolute left-3', {
              'top-[29%]': prefix && !error,
              'sm:top-[18.8%] top-[15.5%]': prefix && error,
            })}
          >
            {prefix}
          </div>
        ) : null}
        <div className=" flex flex-col w-full">
          <MaskedInput
            id={id}
            className={classNames('box-border w-full rounded-lg h-14 focus:outline-none py-4', className, {
              'pl-12 pr-5': prefix && !smallPrefix,
              'pl-7 pr-5': smallPrefix,
              'px-5': !prefix,
              'cursor-not-allowed bg-neutral-100 border border-neutral-200 bg-opacity-30 focus:outline-0': disabled,
              'border border-secondary-100 bg-secondary-100 bg-opacity-5': error,
              'border border-neutral-200 focus:ring-1 focus:ring-primary-100': !error && !disabled,
            })}
            min={min}
            max={max}
            type={type}
            readOnly={readOnly || disabled}
            placeholder={error ? '' : placeholder}
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
            mask={mask}
            alwaysShowMask={alwaysShowMask}
            maskChar={null}
            formatChars={{
              '9': '[0-9]',
              a: '[a-z, A-Z]',
              '*': '[0-9, a-z, A-Z]',
            }}
          />
          {error ? <p className=" text-secondary-200 text-sm font-sans-body mt-2">{error}</p> : null}
        </div>
      </div>
    </div>
  );
};
