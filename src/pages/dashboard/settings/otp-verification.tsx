import React from 'react';
import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { Spacer } from '@/components/spacer';
import { OtpVerificationProps } from './lib/types';
import { ActionModal } from '@/components/modal/action-modal';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  open,
  setOpen,
  error,
  value,
  otpStatus = 'sending',
  onChange,
  disabled,
  phone,
  action = 'Change Bezo Pin',
  onClick,
  loading,
}) => {
  return (
    <ActionModal
      heading="Verify Your Account with the Otp sent"
      titleStyles="text-left"
      open={open}
      setOpen={setOpen}
      className="rounded-2xl "
      modalWidth="sm:max-w-[31.2rem] w-[90vw]"
      action={action}
      actionButtonProps={{
        onClick: onClick,
        disabled,
      }}
      loading={loading}
    >
      <div className=" border-b border-neutral-100 px-7 text-left">
        <Spacer className="h-2" />

        <p className="w-full text-center text-neutral-400 text-sm">{otpStatus === 'sending' ? 'Sending...' : ''}</p>
        <p className="w-full text-center text-success-300 text-sm">{otpStatus === 'success' ? 'Otp Sent' : ''}</p>
        <p className="w-full text-center text-secondary-100 text-sm">
          {otpStatus === 'failed' ? 'Otp failed to send' : ''}
        </p>

        <Spacer className="h-4" />

        <p className=" font-sans font-medium text-lg text-neutral-400">
          A 6 digit code has been sent via sms to <span className=" text-tertiary-200">{phone}</span>. Enter the code
          below to verify and continue.
        </p>

        <Spacer className="h-6" />

        <OtpInput
          value={value}
          onChange={onChange}
          numInputs={6}
          shouldAutoFocus={true}
          isInputNum={true}
          inputStyle={classNames(
            'otp-input border border-neutral-200 text-neutral-500 font-sans-body w-14 h-14 rounded-xl focus:border focus:border-primary-300',
            {
              'border-neutral-200 text-neutral-500 focus:border-primary-300': !error,
              'text-secondary-100 border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100':
                error,
            }
          )}
          errorStyle={'text-secondary-100 border border-secondary-100 opacity-5'}
          containerStyle={'flex space-x-2 lg:space-x-6 justify-center'}
        />
        {error ? (
          <>
            <ErrorText>The Otp Provided is invalid</ErrorText>
          </>
        ) : null}

        <Spacer className="lg:h-24 h-16" />
      </div>

      <Spacer className="lg:h-8" />
    </ActionModal>
  );
};
