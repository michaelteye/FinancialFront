import classNames from 'classnames';
import React, { useContext } from 'react';
import { Spacer } from '@/components/spacer';
import groupReviewImg from '@assets/images/dashboard-images/group-review.png';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { CreateGroupFormContext } from '../group-form-context';
import { CreateGroupFormContextSteps } from '../../lib/types';

export const GroupReview: React.FC<{ setMainModal?: (open: boolean) => void; loading?: boolean }> = ({
  setMainModal,
  loading,
}) => {
  const { form, showPrevStep, step } = useContext(CreateGroupFormContext);
  return (
    <div
      className={classNames('', {
        hidden: step !== CreateGroupFormContextSteps.ADD_MEMBERS,
        '': step === CreateGroupFormContextSteps.ADD_MEMBERS,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        Review your Group Details
      </h1>

      <Spacer className="h-6" />

      <div className="flex items-center space-y-8 p-12 bg-[#FAFBFC] bg-opacity-60 rounded-2xl">
        <div className="flex lg:flex-row flex-col lg:sapce-y-0 space-y-4 items-center w-full">
          <div>
            <img src={groupReviewImg} />
          </div>

          <Spacer className="w-16" />

          <div className="flex flex-col">
            <div className="flex flex-col space-y-1">
              <p className="font-sans text-[#878FAB] text-sm">Group Name: </p>
              <p className="font-sans text-neutral-400 font-medium">{form?.groupName}</p>
            </div>

            <Spacer className="h-10" />

            <div className="flex flex-col space-y-1">
              <p className="font-sans text-[#878FAB] text-sm">Group Description: </p>
              <p className="font-sans text-neutral-400 font-medium">{form?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <ActionButtons
        loading={loading}
        loadingText="Creating Group ..."
        continueText="Create Group"
        onPrevious={() => {
          showPrevStep();
        }}
        onNext={() => {
          setMainModal?.(false);
        }}
      />
    </div>
  );
};
