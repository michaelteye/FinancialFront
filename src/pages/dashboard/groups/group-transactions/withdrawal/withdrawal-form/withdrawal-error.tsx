import React from 'react';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { ErrorBandaid } from '@/components/icons';
import { useWithdrawalContext } from '../withdrawal-context';
import { withdrawalSteps } from '../../../lib/types';

export const WithdrawalError: React.FC<{ message?: string; goalNature?: string }> = ({ message, goalNature }) => {
  const { step, setStep, setForm, setOpen } = useWithdrawalContext();

  if (step !== withdrawalSteps.ERROR) {
    return null;
  }

  return (
    <div className="w-full justify-center">
      <ErrorBandaid className="mx-auto" />

      <h2 className="text-center font-sans text-orange text-2xl">Oops! Payment Failed</h2>

      <Spacer className="h-2" />

      <p className="text-neutral-500">
        {message || 'We are currently looking into this please try again now or later.'}
      </p>

      <Spacer className="h-8" />

      <div className="flex justify-center space-x-4">
        <Button
          variant="secondary"
          className="min-w-[120px]"
          onClick={() => {
            setForm({});
            setOpen?.(false);
            setStep?.(withdrawalSteps.WITHDRAWAL_REQUEST);
          }}
        >
          Close
        </Button>

        <Button
          onClick={() => {
            if (goalNature === 'SplitAndShare') {
              setStep?.(withdrawalSteps.WITHDRAWAL_REQUEST);
            } else {
              setStep?.(withdrawalSteps.WITHDRAWAL_DETAILS);
            }
            setForm({});
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
