import classNames from 'classnames';
import React, { ChangeEvent, ReactNode } from 'react';

interface RadioInputProps {
  id: string;
  text: string | JSX.Element;
  className?: string;
  p2p?: boolean;
  name: string;
  small?: boolean;
  value?: string;
  prefix?: ReactNode;
  defaultChecked?: boolean;
  description?: string;
  nobgColor?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioInput: React.FC<RadioInputProps> = ({
  id,
  text,
  className,
  description,
  name,
  defaultChecked,
  checked,
  onChange,
  nobgColor,
  small,
  prefix,
  disabled,
}) => {
  return (
    <div className={` ${className}`}>
      <label
        htmlFor={id}
        className={classNames(`p-3 flex space-x-2 ${className} `, {
          'bg-neutral-100 rounded-full': !nobgColor,
          'items-center': !description,
          '': nobgColor,
        })}
      >
        <input
          onChange={onChange}
          type="radio"
          id={id}
          // className={className}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
          checked={checked}
        />
        {prefix ? (
          <div className=" flex items-center">
            {prefix}
            <p className="ml-2 font-sans-body text-neutral-900">{text}</p>
          </div>
        ) : description ? (
          <div className="flex flex-col text-left -mt-2">
            <p className="mr-4 font-sans-body text-neutral-900">{text}</p>

            <p className="font-sans-body text-xs text-neutral-500 text-opacity-70">{description}</p>
          </div>
        ) : (
          <p className="sm:mr-4 font-sans-body text-neutral-900 sm:text-base text-sm">{text}</p>
        )}
      </label>
    </div>
  );
};
