import React from 'react';
import classnames from 'classnames';
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  disabled?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
  loading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled,
  loadingText = 'Loading ...',
  onClick,
  className,
  loading,
  isFullWidth,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isTertiary = variant === 'tertiary';

  const loadingStyles = (
    <div className=" inline-flex  items-center">
      <div className="h-4 w-4 rounded-full border border-t-white border-r-white border-primary-200 animate-spin mr-3"></div>
      <p>{loadingText}</p>
    </div>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={classnames(
        `sm:px-12 px-6 sm:py-4 py-3 rounded-xl leading-6 font-medium  transition duration-75 ease-linear font-sans ${className}`,
        {
          'hover:shadow-md': !disabled,
          'w-full': isFullWidth,
          'bg-primary-200 cursor-not-allowed text-white': isPrimary && loading,
          'bg-primary-400 text-white': isPrimary && !loading,
          'hover:bg-primary-200': isPrimary && !disabled,
          'opacity-20 cursor-not-allowed': isPrimary && disabled,
          'px-4 border border-[#161617] border-opacity-5 text-sm leading-5 text-neutral-700': isSecondary,
          'border border-primary-100 text-primary-100 py-3 px-14 font-sans text-sm': isTertiary,
        },
        className
      )}
    >
      {loading ? loadingStyles : children}
    </button>
  );
};
