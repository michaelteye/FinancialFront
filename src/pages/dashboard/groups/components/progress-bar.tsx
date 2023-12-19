import { useContext } from 'react';
import { resolveMaxStep } from '../lib';
import { Spacer } from '@/components/spacer';
import { CreateGroupSavingsGoalFormContext } from '../create-goal/create-group-goal-context';

export const CreateGoalProgressBar = () => {
  const { step, form } = useContext(CreateGroupSavingsGoalFormContext);

  if (step === 0) {
    return null;
  }

  const maxStep = resolveMaxStep(form?.nature!);

  const width = (step! / maxStep!) * 100;

  return (
    <>
      <h3 className="font-medium font-sans-body">
        Steps {step}/{maxStep}
      </h3>

      <Spacer className="h-4" />

      <div className="w-full h-[6px] rounded-full bg-neutral-100 relative">
        <div className="absolute bg-success-300 w-full h-[6px] rounded-full" style={{ width: `${width}%` }}></div>
      </div>

      <Spacer className="h-6" />
    </>
  );
};
