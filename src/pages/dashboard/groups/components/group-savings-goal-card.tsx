import { format } from 'date-fns';
import { GroupGoalsData, Members } from './types';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SvgComputer from '@/components/icons/Computer';
import { RequestMethod, useApi } from '@/helpers/api';
import { WithdrawalSlots } from './modals/withdrawal-slots';
import { NotGoalMember } from './modals/not-goal-member';
import { ActivateSetup } from '../activate-emergency-goal/activate-setup';
import { NotActivated } from '../activate-emergency-goal/Not-activated';

interface SavingsListCardsProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  savingGoal?: GroupGoalsData;
  groupRefId?: string;
  className?: string;
  setOpenModal?: () => void;
  members?: Members[];
  isAdmin?: boolean;
}
export const GroupSavingsGoalCard: React.FC<SavingsListCardsProps> = ({
  savingGoal,
  className,
  groupRefId,
  members,
  isAdmin,
}) => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  const [openSlots, setOpenSlots] = useState(false);
  const [activateGoal, setActivateGoal] = useState(false);
  const [notActivated, setNotActivated] = useState(false);
  const [openNotMemberModal, setOpenNotMemberModal] = useState(false);
  const [rotationalGoalDetails, setRotationalGoalDetails] = useState<GroupGoalsData>({});

  const { submit: fetchSavingGoalDetails } = useApi(`/group/saving-goals?id=${savingGoal?.details?._id}`, {
    onSuccess(response) {
      setRotationalGoalDetails(response.data?.data?.savingGoal);
    },
    method: RequestMethod.GET,
  });

  useEffect(() => {
    if (savingGoal?.details?.nature === 'Rotational') {
      fetchSavingGoalDetails();
    }
  }, []);

  function resolveGoalColor(goalNature?: string) {
    if (goalNature === 'Emergency') {
      return '#FFAB00';
    }
    if (goalNature === 'Rotational') {
      return '#7CECAB';
    }
    if (goalNature === 'Default') {
      return '#74B5EE';
    }
    if (goalNature === 'SplitAndShare') {
      return '#D1B3F4';
    }
    if (goalNature === 'Organizational') {
      return '#4FF8E1';
    }
    return '72D6C6';
  }

  const takenSlots = rotationalGoalDetails?.rotationalSlots?.filter((slots) => {
    return slots?.user_id === userProfile?.id;
  });

  return (
    <>
      <NotGoalMember open={openNotMemberModal} setOpen={setOpenNotMemberModal} goalDetails={savingGoal} />

      <ActivateSetup open={activateGoal} setOpen={setActivateGoal} goalId={savingGoal?.details?._id} />

      <NotActivated open={notActivated} setOpen={setNotActivated} />

      <WithdrawalSlots
        open={openSlots}
        setOpen={setOpenSlots}
        roatationalGoalDetails={rotationalGoalDetails}
        fetchGoalDetails={fetchSavingGoalDetails}
      />
      <button
        onClick={() => {
          if (savingGoal?.isMember === false) {
            setOpenNotMemberModal(true);
          } else {
            if (savingGoal?.details?.nature === 'Rotational' && takenSlots?.length! === 0) {
              setOpenSlots(true);
            } else if (
              isAdmin &&
              savingGoal?.details?.nature === 'Emergency' &&
              savingGoal?.details?.status === 'pending'
            ) {
              setActivateGoal(true);
            } else if (
              !isAdmin &&
              savingGoal?.details?.nature === 'Emergency' &&
              savingGoal?.details?.status === 'pending'
            ) {
              setNotActivated(true);
            } else {
              navigate(
                `/dashboard/groups/${groupRefId ? groupRefId : ''}/${savingGoal ? savingGoal?.details?._id : ''}`
              );
            }
          }
        }}
        className={`max-h-[280px] px-5 py-6 flex flex-col text-left bg-[#FFF0ED] rounded-xl hover:shadow-md w-full h-full transition duration-75 ease-linear savingsListCard ${className}`}
      >
        <div className=" flex flex-col w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-3 lg:space-y-0">
            <div className="text-3xl">{savingGoal?.details?.emoji ? savingGoal?.details?.emoji : <SvgComputer />} </div>

            <div
              className="px-2 py-2 rounded-full items-center text-center"
              style={{ backgroundColor: resolveGoalColor(savingGoal?.details?.nature) }}
            >
              <p className="font-sans text-neutral-400 text-xs">
                {savingGoal?.goalName === 'Emergency' ? 'Auto generated' : savingGoal?.details?.nature}
              </p>
            </div>
          </div>

          <Spacer className="h-2" />

          <label className=" font-sans font-medium text-neutral-400">{savingGoal?.details?.goalName}</label>
          <Spacer className="h-3" />

          <label className=" font-sans font-medium text-neutral-400">
            {savingGoal?.goalName?.length! > 19
              ? `${savingGoal?.goalName?.substring(0, 19)} ...`
              : savingGoal?.goalName}
          </label>
          <label className=" font-sans font-medium text-neutral-400 text-opacity-70 text-xs">
            Created: {savingGoal?.createdAt ? format(new Date(savingGoal?.createdAt!), 'MMM do, yyyy') : ''}
          </label>
        </div>

        <Spacer className=" h-5" />

        <div className=" flex flex-col">
          <p className=" font-sans text-neutral-400 ">GHS</p>
          <p className=" font-sans font-medium text-3xl text-neutral-400">
            {parseFloat(savingGoal?.account?.balance!).toFixed(2)}
          </p>
          <p className=" font-sans font-medium text-xs text-neutral-400 mb-1">Total saving balance</p>
        </div>

        <Spacer className=" h-4" />

        <label className=" font-sans font-medium text-neutral-400">
          {' '}
          {savingGoal?.totalMembers} member{Number(savingGoal?.totalMembers!) > 1 ? 's' : null} participating
        </label>
      </button>
    </>
  );
};
