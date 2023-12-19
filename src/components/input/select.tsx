import React, { Fragment, ReactNode } from 'react';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { Spacer } from '../spacer';
import { CaretDown } from '../icons';

export interface SelectOption {
  label: string | JSX.Element;
  value: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  defaultPlaceholder?: boolean;
  error?: string;
  hideLabel?: boolean;
  value?: string;
  hideErrorMessage?: boolean;
  defaultValue?: string;
  className?: string;
  alwaysShowMask?: boolean;
  mask?: string;
  readOnly?: boolean;
  prefix?: ReactNode;
  options?: SelectOption[] | ((isOpen: boolean) => SelectOption[]);
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const Select: React.FC<SelectProps> = ({
  placeholder = 'Select an option',
  error,
  onChange,
  id,
  label,
  subLabel,
  defaultPlaceholder,
  options,
  value,
  className,
  prefix,
  hideErrorMessage,
}) => {
  const SelectBoxError = error
    ? 'border border-secondary-100 bg-secondary-100 bg-opacity-5'
    : 'border border-neutral-200 focus:ring-1 focus:ring-primary-100';

  return (
    <div className="flex flex-col w-full">
      {label ? (
        <label className="font-sans text-sm text-neutral-400 font-semibold" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <Spacer className="h-1" />

      {subLabel ? (
        <>
          <p className="font-sans-body text-xs text-neutral-400">{subLabel}</p>

          <Spacer className="h-1" />
        </>
      ) : null}

      <div className="relative flex">
        {prefix ? <div className="absolute top-[32%] left-4">{prefix}</div> : null}
        <div className=" flex flex-col w-full ">
          <Listbox
            value={value}
            onChange={(value) => {
              onChange?.({
                target: {
                  value,
                },
              } as any);
            }}
          >
            {({ open }) => {
              const listOptions = typeof options === 'function' ? options(open) : options;

              const selectedOption = listOptions?.find((option) => option.value === value);

              return (
                <>
                  <Listbox.Button
                    className={classNames(
                      'bg-white border border-[#E3E6EA] box-border w-full rounded-lg py-4 text-left pl-4',
                      SelectBoxError,
                      className,
                      {
                        'pl-12 pr-5': prefix,
                        'px-1': !prefix,
                        'text-neutral-300 font-sans-body': placeholder && defaultPlaceholder,
                      }
                    )}
                  >
                    {selectedOption?.label || placeholder}

                    <span
                      className={`absolute  right-0 flex items-center pr-3 pointer-events-none ${
                        error ? 'top-[20%]' : 'inset-y-0'
                      }`}
                    >
                      <CaretDown className="text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-14 overflow-auto text-base bg-white rounded-md shadow-lg max-h-100 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {listOptions?.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active, selected }) =>
                            `${active || selected ? 'bg-[#F7F8FF] cursor-pointer' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 px-4 transition ease-linear`
                          }
                        >
                          {option.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </>
              );
            }}
          </Listbox>
          {error && !hideErrorMessage ? (
            <p className="text-secondary-200 text-sm font-sans-body mt-2">{error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
