import { AvatarGoalList } from '../avatar-list';
import { Button } from '@/components/button';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import { RequestMethod, useApi } from '@/helpers/api';
import { GroupGoalsData, Members } from '../types';
import SvgClose from '@/components/icons/Close';
import { useMessagesStore } from '@/store/messages';
import { useNavigate, useParams } from 'react-router-dom';
import SvgWarningCircle from '@/components/icons/WarningCircle';
import notGoalMemberBg from '@assets/images/dashboard-images/not-goal-member.png';
import { useEffect, useState } from 'react';

export const NotGoalMember: React.FC<{
  open?: boolean;
  setOpen?: (open: boolean) => void;
  goalDetails?: GroupGoalsData;
}> = ({ open, setOpen, goalDetails }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { displayMessage } = useMessagesStore();
  const [goalMembers, setGoalMembers] = useState<Members[]>([]);
  const { submit: subscribeToGoal, isLoading: isSubscribingToGoal } = useApi('/group/goals/subscribe', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Subscribed to savings goal successfully',
        variant: 'success',
      });
      setOpen?.(false);
      goalDetails?.nature !== 'Rotational'
        ? navigate(`/dashboard/groups/${params.refId}/${goalDetails?.details?._id}`)
        : null;
    },
    onError() {
      displayMessage({
        title: 'Failed',
        description: 'Oops! something went wrong, please try again later',
        variant: 'error',
      });
    },
  });

  const { submit: fetchGoalMembers } = useApi(`/group/subscriptions/users?goal=${goalDetails?.details?._id}`, {
    onSuccess(response) {
      setGoalMembers(response.data.data.subscriptions);
    },
    method: RequestMethod.GET,
  });

  useEffect(() => {
    if (open) {
      fetchGoalMembers();
    }
  }, [open]);

  const members = goalMembers.map((member) => {
    return member.user;
  });

  const creator = goalMembers.filter((member) => {
    return member.isCreator;
  });

  function handleSubmit() {
    subscribeToGoal({
      goalId: goalDetails?.details?._id,
      refId: params.refId,
    });
  }

  return (
    <Modal className="max-w-[532px] rounded-2xl" open={open} setOpen={setOpen}>
      <div className="max-h-[650px] overflow-y-auto">
        <Spacer className="h-8" />

        <div className="w-full flex items-center justify-between px-7">
          <h2 className="text-neutral-900 text-lg font-medium">Saving goal info</h2>

          <button
            onClick={() => {
              setOpen?.(false);
            }}
          >
            <SvgClose />
          </button>
        </div>

        <Spacer className="h-5" />

        <div className="mx-7 p-3 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
          <div>
            <SvgWarningCircle className="text-yellow" />
          </div>

          <p className="font-sans-body font-semibold lg:text-sm text-xs text-neutral-400 text-left">
            You cannot contribute to this goal unless you subscribe.
          </p>
        </div>

        <Spacer className="h-5" />

        <div className="border-b border-neutral-100">
          <div className="flex flex-col p-4 mx-7 rounded-lg bg-neutral-100 ">
            <div
              className="justify-center items-center bg-no-repeat"
              style={{ backgroundImage: `url(${notGoalMemberBg})` }}
            >
              <Spacer className="h-3" />

              <p className="font-sans-body text-sm text-[#AAB0C6] mb-4">Goal Name</p>

              <p className="font-sans-body text-sm font-semibold text-[#252525] ">{goalDetails?.details?.goalName}</p>

              <Spacer className="h-5" />

              <p className="font-sans-body text-sm text-[#AAB0C6] mb-4">Created by</p>

              <div className="flex justify-center space-x-1">
                <div>
                  <img
                    className="w-5 h-5 rounded-full bg-neutral-300"
                    src={creator ? creator[0]?.user?.profilePic : ''}
                  />
                </div>
                <p className="font-sans-body text-sm font-semibold text-[#252525] ">
                  {creator ? creator[0]?.user?.fullName : ''}
                </p>
              </div>

              <Spacer className="h-3" />
            </div>
          </div>

          <Spacer className="h-5" />

          <div className="flex flex-col space-y-2 items-center justify-center">
            <p className="flex items-center justify-center font-sans-body text-sm text-[#AAB0C6] mb-4">
              Group contributors ({members?.length})
            </p>

            <Spacer className="h-3" />

            <AvatarGoalList goalMembers={goalMembers} />

            <Spacer className="h-5" />
          </div>

          <div className="flex h-[2px] bg-neutral-100 lg:w-[350px] w-[250px] mx-auto "></div>

          <Spacer className="h-5" />

          <div className="flex flex-col px-7 space-y-3">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-3">
              <div className="flex flex-col lg:items-start items-center space-y-2 ">
                <p className=" flex items-start font-sans-body text-sm text-[#AAB0C6]">Saving goal frequency</p>
                <p className="font-sans-body text-sm text-[#252525]">{goalDetails?.details?.frequency}</p>
              </div>
              <div className="flex flex-col lg:items-start items-center space-y-2">
                <p className=" flex items-start font-sans-body text-sm text-[#AAB0C6]">Saving goal Amount</p>
                <p className=" font-sans-body text-sm text-[#252525] ">GHS {goalDetails?.details?.amountToSave}</p>
              </div>
            </div>

            <div className="flex flex-col lg:text-left text-center space-y-2">
              <p className="flex lg:items-start items-center lg:justify-start justify-center font-sans-body text-sm text-[#AAB0C6]">
                Group Description
              </p>
              <p className=" font-sans-body text-sm  text-[#252525] ">--</p>
            </div>
          </div>

          <Spacer className="h-5" />
        </div>

        <Spacer className="h-8" />

        <div className="flex justify-center">
          <Button onClick={() => handleSubmit()} loading={isSubscribingToGoal}>
            Subscribe to this goal
          </Button>
        </div>

        <Spacer className="h-5" />
      </div>
    </Modal>
  );
};

export const NotAGoalMember: React.FC<{
  open?: boolean;
  setOpen?: (open: boolean) => void;
  goalDetails?: GroupGoalsData;
}> = ({ open, setOpen, goalDetails }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { displayMessage } = useMessagesStore();
  const [goalMembers, setGoalMembers] = useState<Members[]>([]);
  const { submit: subscribeToGoal, isLoading: isSubscribingToGoal } = useApi('/group/goals/subscribe', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Subscribed to savings goal successfully',
        variant: 'success',
      });
      setOpen?.(false);
      goalDetails?.nature !== 'Rotational' ? navigate(`/dashboard/groups/${params.refId}/${goalDetails?._id}`) : null;
    },
    onError() {
      displayMessage({
        title: 'Failed',
        description: 'Oops! something went wrong, please try again later',
        variant: 'error',
      });
    },
  });

  const { submit: fetchGoalMembers } = useApi(`/group/subscriptions/users?goal=${goalDetails?._id}`, {
    onSuccess(response) {
      setGoalMembers(response.data.data.subscriptions);
    },
    method: RequestMethod.GET,
  });

  useEffect(() => {
    if (open) {
      fetchGoalMembers();
    }
  }, [open]);

  const members = goalMembers.map((member) => {
    return member.user;
  });

  const creator = goalMembers.filter((member) => {
    return member.isCreator;
  });

  function handleSubmit() {
    subscribeToGoal({
      goalId: goalDetails?._id,
      refId: params.refId,
    });
  }

  return (
    <Modal className="max-w-[532px] rounded-2xl" open={open} setOpen={setOpen}>
      <div className="max-h-[650px] overflow-y-auto">
        <Spacer className="h-8" />

        <div className="w-full flex items-center justify-between px-7">
          <h2 className="text-neutral-900 text-lg font-medium">Saving goal info</h2>

          <button
            onClick={() => {
              setOpen?.(false);
            }}
          >
            <SvgClose />
          </button>
        </div>

        <Spacer className="h-5" />

        <div className="mx-7 p-3 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
          <div>
            <SvgWarningCircle className="text-yellow" />
          </div>

          <p className="font-sans-body font-semibold lg:text-sm text-xs text-neutral-400 text-left">
            You cannot contribute to this goal unless you subscribe.
          </p>
        </div>

        <Spacer className="h-5" />

        <div className="border-b border-neutral-100">
          <div className="flex flex-col p-4 mx-7 rounded-lg bg-neutral-100 ">
            <div
              className="justify-center items-center bg-no-repeat"
              style={{ backgroundImage: `url(${notGoalMemberBg})` }}
            >
              <Spacer className="h-3" />

              <p className="font-sans-body text-sm text-[#AAB0C6] mb-4">Goal Name</p>

              <p className="font-sans-body text-sm font-semibold text-[#252525] ">{goalDetails?.goalName}</p>

              <Spacer className="h-5" />

              <p className="font-sans-body text-sm text-[#AAB0C6] mb-4">Created by</p>

              <div className="flex justify-center space-x-1">
                <div>
                  <img
                    className="w-5 h-5 rounded-full bg-neutral-300"
                    src={creator ? creator[0]?.user?.profilePic : ''}
                  />
                </div>
                <p className="font-sans-body text-sm font-semibold text-[#252525] ">
                  {creator ? creator[0]?.user?.fullName : ''}
                </p>
              </div>

              <Spacer className="h-3" />
            </div>
          </div>

          <Spacer className="h-5" />

          <div className="flex flex-col space-y-2 items-center justify-center">
            <p className="flex items-center justify-center font-sans-body text-sm text-[#AAB0C6] mb-4">
              Group contributors ({members?.length})
            </p>

            <Spacer className="h-3" />

            <AvatarGoalList goalMembers={goalMembers} />

            <Spacer className="h-5" />
          </div>

          <div className="flex h-[2px] bg-neutral-100 lg:w-[350px] w-[250px] mx-auto "></div>

          <Spacer className="h-5" />

          <div className="flex flex-col px-7 space-y-3">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:space-y-0 space-y-3">
              <div className="flex flex-col lg:items-start items-center space-y-2 ">
                <p className=" flex items-start font-sans-body text-sm text-[#AAB0C6]">Saving goal frequency</p>
                <p className="font-sans-body text-sm text-[#252525]">{goalDetails?.frequency}</p>
              </div>
              <div className="flex flex-col lg:items-start items-center space-y-2">
                <p className=" flex items-start font-sans-body text-sm text-[#AAB0C6]">Saving goal Amount</p>
                <p className=" font-sans-body text-sm text-[#252525] ">GHS {goalDetails?.amountToSave}</p>
              </div>
            </div>

            <div className="flex flex-col lg:text-left text-center space-y-2">
              <p className="flex lg:items-start items-center lg:justify-start justify-center font-sans-body text-sm text-[#AAB0C6]">
                Group Description
              </p>
              <p className=" font-sans-body text-sm  text-[#252525] ">--</p>
            </div>
          </div>

          <Spacer className="h-5" />
        </div>

        <Spacer className="h-8" />

        <div className="flex justify-center">
          <Button onClick={() => handleSubmit()} loading={isSubscribingToGoal}>
            Subscribe to this goal
          </Button>
        </div>

        <Spacer className="h-5" />
      </div>
    </Modal>
  );
};
