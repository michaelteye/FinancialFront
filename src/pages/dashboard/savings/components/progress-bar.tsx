import { useContext } from 'react';
import { Spacer } from '@/components/spacer';
import { CreateSavingsAccountFormContext } from './form-context';
import { CreateSavingsAccountFormSteps } from '../helpers/types';

export const ProgressBar = () => {
  const { step } = useContext(CreateSavingsAccountFormContext);

  if (step === CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE) {
    return null;
  }
  if (step > CreateSavingsAccountFormSteps.REVIEW) {
    return null;
  }

  const width = Math.floor((step / CreateSavingsAccountFormSteps.REVIEW) * 100);
  return (
    <>
      <h3 className="font-medium font-sans-body">
        Steps {step} / {CreateSavingsAccountFormSteps.REVIEW}
      </h3>

      <Spacer className="h-3" />

      <div className="w-full h-[6px] rounded-full bg-neutral-100 relative">
        <div className="absolute bg-success-300 w-full h-[6px] rounded-full" style={{ width: `${width}%` }}></div>
      </div>
      <Spacer className="h-6" />
    </>
  );
};
