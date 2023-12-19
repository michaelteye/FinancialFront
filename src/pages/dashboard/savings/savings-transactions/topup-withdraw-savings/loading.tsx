import React from 'react';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { useOperationsCtx } from './operations-context';
import { OperationsSteps } from '../../helpers/types';

export const Loading: React.FC = () => {
  const { step } = useOperationsCtx();

  if (step !== OperationsSteps.LOADING) {
    return null;
  }

  return (
    <div>
      <Spacer className="h-16" />
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
      <Spacer className="h-6" />
      <div className="w-full">
        <h2 className="text-center font-sans sm:text-2xl text-xl text-neutral-500">Processing transaction ...</h2>

        <Spacer className="h-2" />

        <p className="text-sm text-neutral-800">This may take a few seconds.</p>
      </div>

      <Spacer className="h-12" />
    </div>
  );
};
