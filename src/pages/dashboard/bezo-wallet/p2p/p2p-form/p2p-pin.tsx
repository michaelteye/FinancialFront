import React from 'react';
import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { Spacer } from '@/components/spacer';
import { useP2pContext } from '../p2p-context';
import { P2pError, P2pSteps } from '../../lib/types';

export const P2pPin: React.FC = () => {
  const { step, form, setForm, error, setError } = useP2pContext();

  const hasError = error === P2pError.PIN;

  if (step !== P2pSteps.PIN) {
    return null;
  }

  return (
    <div className="w-full border-b-2 border-neutral-100">
      <p className="text-left my-4 text-neutral-500 px-7">
        Please enter your BezoPin to send <span className="font-semibold"> GHS {form?.amount} </span> to{' '}
        <span className="font-semibold">@{form?.username}</span>.
      </p>

      <OtpInput
        value={form?.pin}
        numInputs={4}
        isInputSecure
        isInputNum={true}
        className="w-14 h-14"
        inputStyle={classNames(
          'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
          {
            ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100': hasError,
          }
        )}
        containerStyle={'flex lg:space-x-6 space-x-2 px-7'}
        onChange={(pin: string) => {
          if (hasError) {
            setError?.(undefined);
          }
          setForm({ ...form, pin });
        }}
      />
      {hasError ? (
        <>
          <Spacer className="h-3" />
          <p className="ml-7 text-left text-secondary-200">Please provide a valid bezo pin</p>
        </>
      ) : null}

      <Spacer className="h-8" />
      <p className="text-sm px-7 text-left">
        If you’ve forgotten your BezoPIN your view or reset it on your{' '}
        <Link to="/dashboard/settings?tab=3" className="text-primary-100">
          settings
        </Link>
      </p>

      <Spacer className="h-12" />
    </div>
  );
};
