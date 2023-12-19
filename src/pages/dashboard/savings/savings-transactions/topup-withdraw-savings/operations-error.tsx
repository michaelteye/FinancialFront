import React from 'react';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { ErrorBandaid } from '@/components/icons';
import { useOperationsCtx } from './operations-context';
import { ActionTypes, OperationsError, OperationsSteps } from '../../helpers/types';
import { Notice } from '@/components/flash/flash';
import { useNavigate } from 'react-router-dom';

export const OperationsErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  const { step, setStep, setOpen, action } = useOperationsCtx();
  const navigate = useNavigate();

  if (step !== OperationsSteps.ERROR) {
    return null;
  }

  return (
    <div className="w-full justify-center px-8">
      <ErrorBandaid className="mx-auto" />

      <h2 className="text-center font-sans text-orange text-2xl">
        Oops! {action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? 'Deposit' : 'Withdrawal'} Failed
      </h2>

      <Spacer className="h-2" />

      <p className="text-neutral-500">
        {message || 'We are currently looking into this please try again now or later.'}
      </p>

      <Spacer className="h-2" />

      {message === OperationsError.UPGRADE_ERROR && step === OperationsSteps.ERROR ? (
        <Notice
          text={
            <p>
              To increase your withdrawal limit, we suggest upgrading your account{' '}
              <span className="underline cursor-pointer" onClick={() => navigate('/dashboard/settings?tab=4')}>
                here.
              </span>
            </p>
          }
        />
      ) : null}

      <Spacer className="h-8" />

      <div className="flex lg:flex-row flex-col sm:w-2/3  mx-auto lg:justify-center items-center lg:space-x-4 space-y-4 lg:space-y-0">
        <Button variant="secondary" className="sm:w-1/2 w-full" onClick={() => setOpen?.(false)}>
          Close
        </Button>
        <Button
          className="sm:w-1/2 w-full"
          onClick={() => {
            setStep(OperationsSteps.SELECT_GOAL);
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
