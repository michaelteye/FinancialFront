import { Notice } from '@/components/flash/flash';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { useContext } from 'react';
import { GroupSavingsType, OrganizationalGroupSavingsSteps } from '../../lib/types';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';

export const AdvanceOption = () => {
  const { step, showNextStep, showPrevStep, form } = useContext(CreateGroupSavingsGoalFormContext);

  if (step !== OrganizationalGroupSavingsSteps.ADVANCE_OPTION || form?.nature !== GroupSavingsType.ORGANIZATIONAL) {
    return null;
  }
  return (
    <>
      <div>
        <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Advance option</h1>

        <Spacer className="h-8" />

        <p className="font-sans font-medium text-lg text-neutral-500">
          What percentage do you want to charge for early withdrawals?{' '}
        </p>

        <Spacer className="h-6" />

        <Input label="Early withdrawal  fee" className="lg:w-1/2" />

        <Spacer className="h-8" />

        <p className="font-sans font-medium text-sm text-neutral-400">Total withdrawal fees perentage = 4%</p>

        <Spacer className="h-8" />

        <Notice text={`BezoSusu charges 4% for early withdrawals, your fee will be attached to ours.`} />
      </div>

      <Spacer className="h-6" />

      <ActionButtons
        onNext={() => {
          showNextStep();
        }}
        onPrevious={() => {
          showPrevStep();
        }}
      />
    </>
  );
};
