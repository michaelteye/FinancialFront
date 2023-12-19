import React from 'react';
import { GroupDetails } from './types';
import { Spacer } from '@/components/spacer';
import SvgComputer from '@/components/icons/Computer';

export const GroupInfo: React.FC<{ groupInfo?: GroupDetails }> = ({ groupInfo }) => {
  return (
    <>
      <Spacer className=" h-9" />

      <div className="review w-full px-12 py-10 bg-[#EBF3F5] bg-opacity-60 flex flex-col rounded-xl">
        <div className="flex flex-col text-left border-b-2 border-neutral-100">
          <div className="text-4xl mb-2">{<SvgComputer />}</div>

          <h5 className="font-sans text-2xl font-medium text-neutral-400 ">{groupInfo?.group?.groupName}</h5>

          <Spacer className="h-6" />

          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">Group Description</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{groupInfo?.group?.description}</p>
          </div>

          <Spacer className="h-5" />
        </div>

        <Spacer className=" h-10" />

        <div className="flex lg:flex-row flex-col lg:space-y-0 space-y-2">
          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">No. Of group member</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{groupInfo?.totalMembers}</p>
          </div>

          <Spacer className="lg:w-24" />

          <div className="flex flex-col space-y-1">
            <p className="font-sans text-[#878FAB]">No. Of group goals</p>

            <p className="font-sans text-neutral-400 text-lg font-medium">{groupInfo?.totalGroupGoals}</p>
          </div>
        </div>
      </div>

      <Spacer className=" h-6" />
    </>
  );
};
