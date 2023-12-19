import SvgSettings from '@/components/icons/Settings';
import SvgTrash from '@/components/icons/Trash';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';
import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GroupMemberDetailsProps, MemberListProps } from '../lib/types';
import { DeleteModal } from './modals/delete-modal';
import { SettingsModal } from './modals/settings-modal';
import { Members } from './types';

export const GroupMemberDetails: React.FC<GroupMemberDetailsProps> = ({ title, description, status }) => {
  return (
    <div className=" flex flex-col space-y-1">
      <p className=" font-sans text-[#7A85A7] text-sm">{title}</p>
      <p
        className={classNames('font-sans text-lg capitalize', {
          'text-[#252525]': !status,
          'text-green': status,
        })}
      >
        {description}
      </p>
    </div>
  );
};

export const MemberList: React.FC<MemberListProps> = ({ memberInfo, groupName, goalName, isAdmin, isCreator }) => {
  const params = useParams();
  const { displayMessage } = useMessagesStore();
  const [removeReason, setRemoveReason] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  const { submit: removeGroupMember, isLoading: isRemovingGroupMember } = useApi('/group/remove-user', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'User removed from group successfully',
        variant: 'success',
      });
      setOpenDeleteModal(false);
    },
    onError(response) {
      displayMessage({
        title: 'Failed',
        description: response?.response?.data.message,
        variant: 'error',
      });
      setOpenDeleteModal(false);
    },
  });

  const { submit: removeGoalMember, isLoading: isRemovingGoalMember } = useApi('/group/goals/remove_user', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'User removed from goal successfully',
        variant: 'success',
      });
      setOpenDeleteModal(false);
    },
    onError(response) {
      displayMessage({
        title: 'Failed',
        description: response?.response?.data.message,
        variant: 'error',
      });
      setOpenDeleteModal(false);
    },
  });

  function handleRemoveFromGroup() {
    removeGroupMember({
      group: memberInfo?.group_id,
      user: memberInfo?._id,
      reason: removeReason,
    });
  }

  function handleRemoveFromGoal() {
    removeGoalMember({
      group: memberInfo?.group_id,
      goal: params.goalId,
      user: memberInfo?._id,
      reason: removeReason,
    });
  }

  function resolveRoleName(params: any, role: string, isSignatory: boolean, isCreator: boolean) {
    if (!params.goalId) {
      return role;
    }
    if (isSignatory) {
      return 'Signatory';
    }
    if (isCreator) {
      return 'Creator';
    }

    return 'User';
  }

  return (
    <>
      <SettingsModal open={openSettingsModal} setOpen={setOpenSettingsModal} memberInfo={memberInfo} />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        action="Yes, remove"
        actionClick={() => {
          if (params.goalId) {
            handleRemoveFromGoal();
          }
          handleRemoveFromGroup();
        }}
        isLoading={params.goalId ? isRemovingGoalMember : isRemovingGroupMember}
        text={
          <div className="flex flex-col space-y-2">
            <p>
              You about to remove <span className="font-bold">"{memberInfo?.user?.fullName}"</span> from{' '}
              <span className="font-bold">{params.goalId ? goalName : groupName}</span> as a member.
            </p>

            {params.goalId ? null : (
              <p className="font-sans-body text-[red]">
                This user has to be unscribed from all the group goals except emergency for this work
              </p>
            )}

            <Spacer className="h-2" />
            <div className="text-center">
              <Input label="Why remove this member: " onChange={(event) => setRemoveReason(event.target.value)} />
            </div>
          </div>
        }
      />

      <div className="flex justify-between mt-5">
        <div className="w-full flex">
          <GroupMemberDetails
            title="Member name"
            description={
              memberInfo?.user?.fullName?.length! > 15
                ? `${memberInfo?.user?.fullName?.substring(0, 15)} ...`
                : memberInfo?.user?.fullName
            }
          />
        </div>
        <div className="w-full flex justify-center">
          <GroupMemberDetails title="Phone number" description={memberInfo?.user?.momo} />
        </div>

        <div className="w-full flex justify-center">
          <GroupMemberDetails
            title="Date  joined"
            description={memberInfo?.createdAt ? format(new Date(memberInfo?.createdAt!), 'MMM do, yyyy') : ''}
          />
        </div>

        <div className="w-full flex justify-center">
          <GroupMemberDetails
            title="Role"
            description={resolveRoleName(params, memberInfo?.role!, memberInfo?.isSignatory!, memberInfo?.isCreator!)}
          />
        </div>

        <div className="w-full flex">
          <GroupMemberDetails status title="Status" description={memberInfo?.user?.status} />
        </div>

        {isAdmin || isCreator ? (
          <div className="w-full flex space-x-3 items-center">
            <button
              onClick={() => {
                setOpenSettingsModal(true);
              }}
            >
              <SvgSettings />
            </button>
            <button
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            >
              <SvgTrash />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export const PendingMemberList: React.FC<MemberListProps> = ({
  memberInfo,
  groupName,
  fetchPendingInvites,
  isAdmin,
  isCreator,
}) => {
  const { displayMessage } = useMessagesStore();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const { submit: cancelInvite, isLoading: isCancelingInvite } = useApi('/user/group/cancel_invite', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Invite request canceled successfully',
        variant: 'success',
      });
      setOpenCancelModal(false);
      fetchPendingInvites?.();
    },
    onError() {
      displayMessage({
        title: 'Failure',
        description: "Something wen't wrong, please try again later",
        variant: 'error',
      });
      setOpenCancelModal(false);
    },
  });

  function handleCancelClick() {
    cancelInvite({
      inviteId: memberInfo?._id,
    });
  }

  return (
    <>
      <DeleteModal
        open={openCancelModal}
        setOpen={setOpenCancelModal}
        hideCancel
        action="Cancel Request"
        isLoading={isCancelingInvite}
        actionClick={() => handleCancelClick()}
        text={
          <span>
            You about to Cancel the request made to{' '}
            <span className="font-bold">{memberInfo?.user ? memberInfo?.user?.fullName : 'unknown'}</span> to join{' '}
            <span className="font-bold">{groupName}</span>
          </span>
        }
      />

      <div className="flex justify-between mt-5">
        {memberInfo?.user === null ? (
          <div className="flex justify-between w-4/5 items-center">
            <p className="w-full text-lg text-secondary-200">This user is not yet a registered bezoSusu user</p>

            <div className="w-full flex justify-center">
              <GroupMemberDetails
                title="Date Sent"
                description={memberInfo?.createdAt ? format(new Date(memberInfo?.createdAt!), 'MMM do, yyyy') : ''}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-full flex">
              <GroupMemberDetails
                title="Member name"
                description={
                  memberInfo?.user?.fullName?.length! > 14
                    ? `${memberInfo?.user?.fullName?.substring(0, 14)} ...`
                    : memberInfo?.user?.fullName
                }
              />
            </div>
            <div className="w-full flex">
              <GroupMemberDetails title="Phone number" description={memberInfo?.user?.momo} />
            </div>

            <div className="w-full flex">
              <GroupMemberDetails
                title="Date Sent"
                description={memberInfo?.createdAt ? format(new Date(memberInfo?.createdAt!), 'MMM do, yyyy') : ''}
              />
            </div>

            <div className="w-full flex">
              <GroupMemberDetails status title="Status" description={memberInfo?.user?.status} />
            </div>
          </>
        )}

        {isAdmin || isCreator ? (
          <div
            className={classNames('flex', {
              'w-full': memberInfo?.user !== null,
              'w-1/5': memberInfo?.user === null,
            })}
          >
            <button
              onClick={() => setOpenCancelModal(true)}
              className="w-full flex items-center justify-center rounded-[50px] bg-secondary-200 px-6 py-3 font-sans font-medium text-white capitalize"
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};
