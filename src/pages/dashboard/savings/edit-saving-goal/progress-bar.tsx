import { useContext } from 'react';
import { Spacer } from '@/components/spacer';
import { editSavingsGoalFormContext } from './edit-goal-context';
import { editSavingGoalSteps } from '../helpers/types';

export const EditProgressBar = () => {
  const { step } = useContext(editSavingsGoalFormContext);

  if (step > editSavingGoalSteps.REVIEW) {
    return null;
  }

  const width = Math.floor((step / editSavingGoalSteps.REVIEW) * 100);
  return (
    <>
      <h3 className="font-medium font-sans-body">
        Steps {step} / {editSavingGoalSteps.REVIEW}
      </h3>
      <Spacer className="h-3" />
      <div className="w-full h-[6px] rounded-full bg-neutral-100 relative">
        <div className="absolute bg-success-300 w-full h-[6px] rounded-full" style={{ width: `${width}%` }}></div>
      </div>
      <Spacer className="h-6" />
    </>
  );
};
