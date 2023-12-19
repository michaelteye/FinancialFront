import React from 'react';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { useWithdrawalContext } from '../withdrawal-context';
import { withdrawalSteps } from '../../../lib/types';

export const WithdrawLoading: React.FC = () => {
  const { step } = useWithdrawalContext();

  if (step !== withdrawalSteps.LOADING) {
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
        <h2 className="text-center font-sans text-2xl text-neutral-500">Processing Request...</h2>

        <Spacer className="h-2" />

        <p className="text-sm text-neutral-800">Processing your Request. This will take some few seconds</p>
      </div>

      <Spacer className="h-12" />
    </div>
  );
};
