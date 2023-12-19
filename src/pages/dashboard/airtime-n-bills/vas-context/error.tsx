import { ErrorBandaid } from '@/components/icons';
import { Spacer } from '@/components/spacer';
import { VasSteps } from '../lib/types';
import { useVasContext } from './vas-context';
import React from 'react';

export const VasError: React.FC<{ message?: string }> = ({ message }) => {
  const { step } = useVasContext();

  if (step !== VasSteps.ERROR) {
    return null;
  }
  return (
    <div className="w-full justify-center px-8">
      <ErrorBandaid className="mx-auto" />

      <h2 className="text-center font-sans text-orange text-2xl">Oops! Payment Failed</h2>

      <Spacer className="h-2" />

      <p className="text-neutral-500">
        {message || 'We are currently looking into this please try again now or later.'}
      </p>

      <Spacer className="h-8" />
    </div>
  );
};
