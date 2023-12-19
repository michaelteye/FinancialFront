import { useContext } from 'react';
import { Spacer } from '@/components/spacer';
import { useInvestContext } from '../invest-ctx';
import { InvestSteps } from '../types';

export const ProgressBar = () => {
  const { step } = useInvestContext();

  if (step > InvestSteps.REVIEW) {
    return null;
  }

  const width = Math.floor((step / InvestSteps.REVIEW) * 100);

  return (
    <>
      <h3 className="font-medium font-sans-body">
        Steps {step} / {InvestSteps.REVIEW}
      </h3>

      <Spacer className="h-3" />

      <div className="w-full h-[6px] rounded-full bg-neutral-100 relative">
        <div className="absolute bg-success-300 w-full h-[6px] rounded-full" style={{ width: `${width}%` }}></div>
      </div>
      <Spacer className="h-6" />
    </>
  );
};
