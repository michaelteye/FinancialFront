import React from 'react';

import { Spacer } from '@/components/spacer';
import notAvalaibleImg2 from '@assets/images/dashboard-images/not-activated-2.jpg';
import { activateSteps, useActivateContext } from '../activate-context';

export const Step2 = () => {
  const { step } = useActivateContext();

  if (step !== activateSteps.STEP_2) {
    return null;
  }

  return (
    <div className="flex flex-col px-7 justify-center items-center  border-b border-neutral-100">
      <Spacer className="h-4" />

      <p className="font-sans text-sm font-semibold text-neutral-400">Secure your rainy day</p>

      <Spacer className="h-3" />

      <div>
        <img src={notAvalaibleImg2} />
      </div>

      <Spacer className="h-3" />

      <p className="font-sans text-sm font-semibold text-neutral-400">
        Set up signatories to your emergency account to secure withdrawals
      </p>

      <Spacer className="h-6" />
    </div>
  );
};
