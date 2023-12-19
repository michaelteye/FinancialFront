import React from 'react';
import { Flag } from '../icons';
import Input from 'react-input-mask';

interface phoneNumberInputError {
  error?: string;
  value?: string;
  label?: string;
  flagClassName?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
}

export const PhoneNumberInput: React.FC<phoneNumberInputError> = ({
  onChange,
  error,
  labelClassName,
  label,
  flagClassName = 'top-[46px] sm:left-7 left-3',
  value,
  onKeyPress,
}) => {
  const inputBoxError = error ? ' border-secondary-100' : 'border-neutral-200 focus:ring-1 focus:ring-primary-100';

  // to get the value of the Phone input, we use the onChange (recieves a function) prop which reacts to any change in value

  return (
    <div className="w-full flex flex-col relative">
      <label htmlFor="phone" className={`font-sans font-medium text-neutral-500 ${labelClassName}`}>
        {label || 'Phone number'}
      </label>

      <Input
        className={`h-14 w-full mt-1 rounded-lg border focus:outline-none  py-4 pr-10 sm:pl-14 pl-10 ${inputBoxError}`}
        type="text"
        placeholder="eg. (233) 24 000 0000"
        id="phone"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        mask="(233) 99 999 9999"
        maskChar={null}
        formatChars={{
          '9': '[0-9]',
        }}
      />

      <div className={`absolute ${flagClassName}`}>
        <Flag />
      </div>

      {error ? <p className="mt-1 font-normal text-sm font-sans-body text-secondary-100 leading-5">{error}</p> : null}
    </div>
  );
};
