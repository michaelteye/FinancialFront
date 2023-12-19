import React from 'react';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { ErrorBandaid } from '@/components/icons';
import { useInvestContext } from '../invest-ctx';
import { ActionModal } from '@/components/modal/action-modal';
import { InvestSteps } from '../types';

export const InvestErrorMessage: React.FC<{ openErr: boolean; setOpenErr: (open: boolean) => void }> = ({
  openErr,
  setOpenErr,
}) => {
  const { error, setOpen, setStep, setForm, setError } = useInvestContext();

  return (
    <ActionModal modalWidth="lg:w-[700px]" open={openErr} setOpen={setOpenErr} hideCancel hideContinue>
      <div className="w-full justify-center px-8">
        <ErrorBandaid className="mx-auto" />

        <h2 className="text-center font-sans text-orange text-2xl">Oops! Payment Failed</h2>

        <Spacer className="h-2" />

        <p className="text-neutral-500">
          {error || 'We are currently looking into this please try again now or later.'}
        </p>

        <Spacer className="h-8" />

        <div className="flex lg:flex-row flex-col lg:justify-center items-center lg:space-x-4 space-y-4 lg:space-y-0">
          <Button variant="secondary" className="lg:w-[120px] w-full" onClick={() => setOpenErr?.(false)}>
            Close
          </Button>
          <Button
            className="lg:w-[200px] w-full"
            onClick={() => {
              setOpen?.(true);
              setOpenErr(false);
              setError(undefined);
              setForm({});
              setStep(InvestSteps.SELECT_TYPE);
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    </ActionModal>
  );
};
