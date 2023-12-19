import React from 'react';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { ErrorBandaid } from '@/components/icons';
import { useContributeContext } from '../contribute-context';
import { ContributeSteps } from '../../../lib/types';

export const ContributeErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  const { step, setStep, setOpen, setForm } = useContributeContext();

  if (step !== ContributeSteps.ERROR) {
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
            setOpen?.(false);
            setForm({});
          }}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            setStep(ContributeSteps.SELECT_GOAL);
            setForm({});
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
