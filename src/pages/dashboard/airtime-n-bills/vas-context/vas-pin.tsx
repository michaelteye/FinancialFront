import React from 'react';
import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { Spacer } from '@/components/spacer';
import { useVasContext } from './vas-context';
import { VasSteps } from '../lib/types';

export const VasPin: React.FC<{ setUserPin: (pin: string) => void; pinError: string }> = ({ setUserPin, pinError }) => {
  const { step, userPin } = useVasContext();

  if (step !== VasSteps.PIN) {
    return null;
  }

  return (
    <div className="w-full">
      <p className="my-4 text-neutral-500 px-7 text-left">Please enter your BezoPin to continue with purchase</p>

      <OtpInput
        value={userPin}
        numInputs={4}
        isInputSecure
        isInputNum={true}
        className="w-14 h-14"
        inputStyle={classNames(
          'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
          {
            ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100': pinError,
          }
        )}
        containerStyle={'flex lg:space-x-6 space-x-2 px-7'}
        onChange={(pin: string) => {
          // if (pinError) {
          //   pinError = false;
          // }
          setUserPin(pin);
        }}
      />
      {pinError ? (
        <div className=" px-7 text-left">
          <Spacer className="h-3" />
          <p className="text-secondary-200">{pinError}</p>
        </div>
      ) : null}

      <Spacer className="h-8" />

      <p className="text-sm px-7 text-left">
        If you’ve forgotten your BezoPIN your view or reset it on your{' '}
        <Link to="/dashboard/settings?tab=3" className="text-primary-100">
          settings
        </Link>{' '}
      </p>

      <Spacer className="h-12" />
    </div>
  );
};
