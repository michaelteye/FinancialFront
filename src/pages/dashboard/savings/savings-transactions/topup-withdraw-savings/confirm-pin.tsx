import React from 'react';
import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { Spacer } from '@/components/spacer';
import { useOperationsCtx } from './operations-context';
import { ActionTypes, OperationsError, OperationsSteps } from '../../helpers/types';

export const ConfirmPin: React.FC = () => {
  const { step, form, setForm, selectedGoal, error, setError, action } = useOperationsCtx();

  const hasError = error === OperationsError.PIN;

  if (step !== OperationsSteps.PIN) {
    return null;
  }

  return (
    <div className="w-full">
      <p className="my-4 text-neutral-500 px-7 text-left">
        Enter your BezoPin to{' '}
        {action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? 'top up' : 'withdraw'}{' '}
        <b>GHS {parseFloat(form.amount!)} </b>
        {action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? 'into' : 'from'} your{' '}
        {!selectedGoal ? 'BezoWallet' : `${selectedGoal?.account?.name} account`}
      </p>

      <OtpInput
        value={form.pin}
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
            setError(undefined);
          }
          setForm({ ...form, pin });
        }}
      />
      {hasError ? (
        <div className=" px-7 text-left">
          <Spacer className="h-3" />
          <p className="text-secondary-200">Provide a valid BezoPIN</p>
        </div>
      ) : null}

      <Spacer className="h-8" />

      <p className="text-sm px-7 text-left">
        Forgotten your BezoPIN? Go to{' '}
        <Link to="/dashboard/settings?tab=3" className="text-primary-100">
          settings
        </Link>{' '}
        to reset it{' '}
      </p>

      <Spacer className="h-12" />
    </div>
  );
};
