import classNames from 'classnames';
import React from 'react';
import SvgCheckCircle from '../icons/CheckCircle';
import SvgSpinner from '../icons/Spinner';
import SvgWarningCircle from '../icons/WarningCircle';

export interface FlashProps {
  variant?: 'warning' | 'info' | 'success';
}

export const Flash: React.FC<FlashProps> = ({ variant = 'info', children }) => {
  return (
    <div
      className={classNames(' w-full py-4 px-4 bg-[#F3F2F8]  flex items-center rounded-xl space-x-6', {
        'border-[#F3F2F8]': variant === 'info',
        'bg-[#FFAB00] bg-opacity-10': variant === 'warning',
        'bg-[#E3FBE4]': variant === 'success',
      })}
    >
      <div>
        {variant !== 'success' ? (
          <SvgSpinner
            fill="currentColor"
            className={classNames({
              'text-[#FFAB00]': variant === 'warning',
              'text-neutral-400': variant === 'info',
            })}
          />
        ) : (
          <SvgCheckCircle />
        )}
      </div>

      <p className=" font-sans-body font-semibold text-neutral-400 text-sm">{children}</p>
    </div>
  );
};

export const Notice: React.FC<{
  text?: string | JSX.Element;
  noIcon?: boolean;
  className?: string;
}> = ({ text, noIcon, className }) => {
  return (
    <div className={`flex w-full rounded-xl p-2 bg-[#F3F2F8] border border-[#F3F2F8] items-start ${className}`}>
      <div className="flex space-x-3 sm:items-center items-start">
        {noIcon ? null : (
          <div>
            <SvgWarningCircle className="text-[#6361D9]" />
          </div>
        )}

        <p className="text-neutral-400 font-sans-body font-semibold text-sm sm:text-center text-left">{text}</p>
      </div>
    </div>
  );
};
