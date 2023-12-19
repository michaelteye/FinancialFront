import React from 'react';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { useVasContext } from './vas-context';
import { VasSteps } from '../lib/types';

export const VasLoading: React.FC = () => {
  const { step } = useVasContext();

  if (step !== VasSteps.LOADING) {
    return null;
  }

  return (
    <div className="px-12">
      <Spacer className="h-16" />
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
      <Spacer className="h-6" />
      <div className="w-full">
        <h2 className="text-center font-sans sm:text-2xl text-xl text-neutral-500">Processing payment ...</h2>

        <Spacer className="h-2" />

        <p className="text-sm text-neutral-800">Processing your purchase. This will take some few seconds</p>
      </div>

      <Spacer className="h-12" />
    </div>
  );
};
