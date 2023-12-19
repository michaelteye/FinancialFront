import React from 'react';
import { Link } from 'react-router-dom';
import { AvatarList } from './avatar-list';
import { Spacer } from '@/components/spacer';
import { SavingsListCardsProps } from '../lib/types';

export const GroupCard: React.FC<SavingsListCardsProps> = ({ userGroupData = {}, className, groupMembers = [] }) => {
  return (
    <Link to={userGroupData?.details?.ref_id!}>
      <button
        className={`max-h-[280px] px-5 py-6 flex flex-col text-left bg-[#FFF0ED] rounded-xl hover:shadow-md w-full h-full transition duration-75 ease-linear savingsListCard ${className}`}
      >
        <div className=" flex flex-col w-full">
          <Spacer className=" h-2" />

          <label className=" font-sans font-medium text-neutral-400 text-xl">
            {userGroupData?.details?.groupName?.length! > 19
              ? `${userGroupData?.details?.groupName?.substring(0, 19)} ...`
              : userGroupData?.details?.groupName}
          </label>
          <label className=" font-sans font-medium text-neutral-400 text-opacity-70 text-xs">
            Ref ID: {userGroupData?.details?.ref_id}
          </label>
        </div>

        <Spacer className=" h-7" />

        <div className=" flex flex-col">
          <p className=" font-sans text-neutral-400 ">GHS</p>
          <p className=" font-sans font-medium text-3xl text-neutral-400">
            {userGroupData ? parseFloat(userGroupData?.totalBalance!).toFixed(2) : '--'}
          </p>
          <p className=" font-sans font-medium text-xs text-neutral-400 mb-1">Total saving balance</p>
        </div>

        <Spacer className="h-5" />

        <AvatarList groupMembers={groupMembers} />

        <Spacer className="h-4" />

        <label className=" font-sans font-medium text-neutral-400">
          {groupMembers?.length} {groupMembers.length <= 1 ? ' group member' : ' group members'}
        </label>
      </button>
    </Link>
  );
};
