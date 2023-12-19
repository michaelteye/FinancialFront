import React from 'react';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { ErrorBandaid } from '@/components/icons';
import { useP2pContext } from '../p2p-context';
import { P2pSteps } from '../../lib/types';

interface P2pErrorMessageProps {
  message?: string;
}
export const P2pErrorMessage: React.FC<P2pErrorMessageProps> = ({ message }) => {
  const { step, setStep, setOpen } = useP2pContext();

  if (step !== P2pSteps.ERROR) {
    return null;
  }

  return (
    <div className="w-full justify-center px-4">
      <ErrorBandaid className="mx-auto" />

      <h2 className="text-center font-sans text-orange text-2xl">Oops! Payment Failed</h2>

      <Spacer className="h-2" />

      <p className="text-neutral-500">
        {message || 'We are currently looking into this please try again now or later.'}
      </p>

      <Spacer className="h-8" />

      <div className="flex justify-center space-x-4">
        <Button variant="secondary" className="min-w-[120px]" onClick={() => setOpen?.(false)}>
          Close
        </Button>
        <Button
          onClick={() => {
            setStep(P2pSteps.FORM_DETAILS);
          }}
        >
          Try again
        </Button>
      </div>
    </div>
  );
};
