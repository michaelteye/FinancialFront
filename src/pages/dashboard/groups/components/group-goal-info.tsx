import React from 'react';
import { Spacer } from '@/components/spacer';
import { GroupGoalsData } from './types';
import SvgComputer from '@/components/icons/Computer';
import { useParams } from 'react-router-dom';

export const GroupGoalInfo: React.FC<{ goalInfo?: GroupGoalsData }> = ({ goalInfo }) => {
  const params = useParams();
  return (
    <>
      <Spacer className=" h-9" />

      <div className="review w-full px-12 py-10 bg-[#EBF3F5] bg-opacity-60 flex flex-col rounded-xl">
        <div className="flex flex-col text-left border-b-2 border-neutral-100">
          <div className="text-4xl mb-2">{<SvgComputer />}</div>

          <h5 className="font-sans text-2xl font-medium text-neutral-400 ">{goalInfo?.goalName}</h5>

          <p className="font-sans text-[#878FAB]">{goalInfo?.nature}</p>

          <Spacer className="h-6" />

          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">Goal Description</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{'-'}</p>
          </div>

          <Spacer className="h-5" />
        </div>

        <Spacer className=" h-10" />

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">Amount To Save</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">
              {parseFloat(goalInfo?.amountToSave!).toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">Saving Freqency</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{goalInfo?.frequency}</p>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">Withdrawal frequency</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{'-'}</p>
          </div>

          {params.goalId ? null : <Spacer className="lg:w-24" />}

          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">No. Of goal Members</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{goalInfo?.totalMembers}</p>
          </div>

          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">No. Of Signatories</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{goalInfo?.signatories}</p>
          </div>

          {goalInfo?.nature === 'Rotational' ? (
            <div className="flex flex-col space-y-1">
              <p className="font-sans text-[#878FAB]">No. Of Payout Slots</p>

              <p className="font-sans text-neutral-400 text-lg font-medium">{goalInfo?.rotationalSlots?.length}</p>
            </div>
          ) : null}
        </div>
      </div>

      <Spacer className=" h-6" />
    </>
  );
};
