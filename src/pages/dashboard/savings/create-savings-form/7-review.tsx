import classNames from 'classnames';
import React, { useContext } from 'react';
import format from 'date-fns/format';

import { Spacer } from '@/components/spacer';
import SvgComputer from '@/components/icons/Computer';
import { ActionButtons } from '../components/action-buttons';
import { CreateSavingsAccountFormContext } from '../components/form-context';
import { CreateSavingsAccountFormSteps } from '../helpers/types';
import { CONST } from '../../tools/constants';
import { useAccountTypes } from '@/hooks/useAccountTypes';
import { LockTypes } from '../../tools/types';

export const ReviewDetails: React.FC<{ title: string | JSX.Element; details: string }> = ({ title, details }) => {
  return (
    <div>
      <p className=" font-sans text-[#878FAB] text-sm">{title}</p>
      <p className=" font-sans text-neutral-400 sm:text-lg font-medium capitalize">{details}</p>
    </div>
  );
};

export const Review: React.FC<{ setUserPinModalOpen?: (open: boolean) => void }> = ({ setUserPinModalOpen }) => {
  const { data: accountTypes } = useAccountTypes();
  const { step, form, showPreviousStep } = useContext(CreateSavingsAccountFormContext);

  const bezoLock = accountTypes?.find((account) => account.name === LockTypes.BEZO_LOCK);

  return (
    <>
      <div
        className={classNames({
          hidden: step !== CreateSavingsAccountFormSteps.REVIEW,
          '': step === CreateSavingsAccountFormSteps.REVIEW,
        })}
      >
        <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1 capitalize">
          {form.goalType} Goal Summary
        </h1>

        <Spacer className=" h-9" />

        <div className=" review w-full sm:px-12 px-6 py-10 bg-[#EBF3F5] bg-opacity-60 flex flex-col rounded-xl">
          <div className=" flex flex-col text-left">
            <div className="text-4xl mb-2">{form?.emoji ? form?.emoji : '✨'}</div>

            <h5 className=" font-sans text-2xl font-medium text-neutral-400 ">{form.goalName}</h5>

            <p className=" font-sans font-medium text-md text-neutral-400">{form.goalType}</p>
          </div>

          <Spacer className=" h-8" />

          <div className=" flex flex-col space-y-8">
            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
              <ReviewDetails title="Target Amount" details={`GHS ${form.amountToRaise}`} />
              <ReviewDetails
                title="Account Type"
                details={
                  form.accountType?.name === LockTypes.BEZO_LOCK
                    ? form.accountType?.name?.replace(/\s/g, '')
                    : 'BezoFlex'
                }
              />
              <ReviewDetails
                title={<span className="capitalize">{form.frequency} Amount</span>}
                details={`GHS ${form.amountToSave}`}
              />
              <ReviewDetails title="Frequency" details={`${form.frequency}`} />
              <ReviewDetails
                title="Interest rate"
                details={` ${
                  form.accountType?.name === LockTypes.BEZO_LOCK ? CONST.BEZO_LOCK_INTEREST : CONST.BEZO_FLEX_INTEREST
                } per annum`}
              />
              <ReviewDetails title="Start Date" details={format(form?.startDate!, 'ccc, MMM do, yyyy')} />
              <ReviewDetails title="End Date" details={format(form?.endDate!, 'ccc MMM do, yyyy')} />

              <ReviewDetails title="Debit Type" details={`${form.depositPreference}`} />
            </div>
          </div>

          <Spacer className=" h-10" />
        </div>

        <Spacer className=" h-6" />

        <ActionButtons
          onNext={() => {
            setUserPinModalOpen?.(true);
          }}
          onPrevious={() => showPreviousStep()}
        />

        <Spacer className="sm:hidden h-24" />
        <Spacer className="sm:hidden h-10" />
      </div>
    </>
  );
};
