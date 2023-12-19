import classNames from 'classnames';
import React, { useContext } from 'react';

import { Spacer } from '@/components/spacer';
import SvgComputer from '@/components/icons/Computer';
import { ActionButtons } from '../components/action-buttons';
import { useAuthStore } from '@/store/auth';
import { editSavingsGoalFormContext } from './edit-goal-context';
import { maskedDisplayPhoneNum } from '../helpers';
import { editSavingGoalSteps } from '../helpers/types';
import { CONST } from '../../tools/constants';

const ReviewDetails: React.FC<{ title: string; details: string }> = ({ title, details }) => {
  return (
    <div>
      <p className=" font-sans text-[#878FAB] text-sm">{title}</p>
      <p className=" font-sans text-neutral-400 text-lg font-medium">{details}</p>
    </div>
  );
};

export const EditReview: React.FunctionComponent<{
  onContinue: () => void;
}> = ({ onContinue }) => {
  const { userProfile } = useAuthStore();
  const { step, form, showPrevStep } = useContext(editSavingsGoalFormContext);

  const displayPhoneNumberMask = maskedDisplayPhoneNum(userProfile?.phone!);

  return (
    <div
      className={classNames({
        hidden: step !== editSavingGoalSteps.REVIEW,
        '': step === editSavingGoalSteps.REVIEW,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        {form.goalType} saving plan review
      </h1>

      <Spacer className=" h-9" />

      <div className=" review w-full px-12 py-10 bg-[#EBF3F5] bg-opacity-60 flex flex-col rounded-xl">
        <div className=" flex flex-col text-left">
          <div className="text-4xl mb-2">{form?.emoji ? form?.emoji : <SvgComputer />}</div>

          <h5 className=" font-sans text-2xl font-medium text-neutral-400 ">{form.savingGoalName}</h5>

          <p className=" font-sans font-medium text-md text-neutral-400">{form.goalType}</p>
        </div>

        <Spacer className=" h-8" />

        <div className="  flex flex-col space-y-8">
          <div className=" flex flex-col">
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 ">
              <ReviewDetails title="Amount to save" details={`GHS ${form.amountToSave}`} />

              <ReviewDetails title="Freqency" details={`${form.frequency}`} />

              <ReviewDetails title="Interest rate" details={`${CONST.BEZO_FLEX_INTEREST} per annum`} />

              <ReviewDetails title="Start date" details={`${form.startDate?.toDateString()}`} />

              <ReviewDetails title="End date" details={`${form.endDate?.toDateString?.()}`} />

              <ReviewDetails title="Debit type" details={`${form.depositPreference}`} />
            </div>
          </div>
          <ReviewDetails title="Payment method" details={` Mobile money (${displayPhoneNumberMask})`} />
        </div>

        <Spacer className=" h-10" />
      </div>

      <Spacer className=" h-6" />

      <ActionButtons onPrevious={() => showPrevStep()} onNext={onContinue} />
    </div>
  );
};
