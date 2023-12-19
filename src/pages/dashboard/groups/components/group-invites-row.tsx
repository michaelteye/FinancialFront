import SvgDislike from '@/components/icons/Dislike';
import React, { useState } from 'react';
import SvgLike from '@/components/icons/Like';
import { Detail } from '../../savings/savings-details-row';
import SvgOpenPassword from '@/components/icons/OpenPassword';
import { AvatarList } from './avatar-list';
import { GroupModalLayout } from './modals/modal-layout';
import SvgAccepted from '@/components/icons/Accepted';
import { DeleteModal } from './modals/delete-modal';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';
import { formatDistanceToNow } from 'date-fns';
import { ViewGroupModal } from './modals/view-group-modal';
import { GroupInvitesRowProps } from '../lib/types';

export const GroupInvitesDetails: React.FC<{ GroupName?: string; Ref?: string | number }> = ({ GroupName, Ref }) => {
  return (
    <div className=" flex flex-col items-start">
      <p className=" font-sans font-semibold text-[#000] capitalize">{GroupName}</p>
      <p className=" font-sans-body text-[#000] text-sm">#REF-ID: {Ref}</p>
    </div>
  );
};

export const GroupInvitesRow: React.FC<GroupInvitesRowProps> = ({
  pendingInvite,
  fetchInvites,
  fetchGroups,
  groupMembers,
}) => {
  const { displayMessage } = useMessagesStore();
  const [openAccept, setOpenAccept] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const { submit: addGroupMember, isLoading: isAccepting } = useApi('/group/requests/response', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Group member added successfully',
        variant: 'success',
      });
      fetchInvites?.();
      fetchGroups?.();
      setOpenAccept(false);
    },
  });
  const { submit: declineInvite, isLoading: isDeclining } = useApi('/group/requests/response', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Request declined successfully',
        variant: 'success',
      });
      fetchInvites?.();
      setOpenReject(false);
    },
  });

  return (
    <>
      <GroupModalLayout
        open={openAccept}
        setOpen={setOpenAccept}
        icon={SvgAccepted}
        action="Join"
        isLoading={isAccepting}
        actionClick={() => {
          addGroupMember({
            refId: pendingInvite?.group?.ref_id,
            response: 'approve',
          });
        }}
        headerText={<p className="font-sans-body text-neutral-400 font-semibold">Save with others</p>}
      >
        <p className="text-[#252525] font-sans-body text-center px-7">
          You’ve opted to join <span className="font-bold">{pendingInvite?.group.groupName}</span>. This will give you
          access to contribute towards group’s goals
        </p>
      </GroupModalLayout>
      <ViewGroupModal
        open={openView}
        setOpen={setOpenView}
        isLoading={isAccepting}
        invite={pendingInvite}
        actionClick={() => {
          addGroupMember({
            refId: pendingInvite?.group?.ref_id,
            response: 'approve',
          });
        }}
        headerText={<p className="font-sans-body text-neutral-400 font-semibold">Save with others</p>}
      />
      <DeleteModal
        open={openReject}
        setOpen={setOpenReject}
        isLoading={isDeclining}
        actionClick={() => {
          declineInvite({
            refId: pendingInvite?.group?.ref_id,
            response: 'decline',
          });
        }}
        text={` “${pendingInvite?.group.groupName}” invitation will not be accessible to you if you go ahead to decline.`}
      />

      <div className="w-full flex justify-between items-center">
        <div className="flex w-full">
          <GroupInvitesDetails
            GroupName={
              pendingInvite?.group?.groupName?.length! > 17
                ? `${pendingInvite?.group?.groupName?.substring(0, 17)} ...`
                : pendingInvite?.group?.groupName
            }
            Ref={pendingInvite?.group?.ref_id}
          />
        </div>

        <div className="flex w-full">
          <Detail
            label="Date of  invitation"
            value={pendingInvite ? `${formatDistanceToNow(new Date(pendingInvite?.createdAt!))} ago` : ''}
          />
        </div>

        <div className="flex w-full">
          <Detail label="No. of goals" value="-" />
        </div>

        <div className="flex w-full">
          <AvatarList groupMembers={groupMembers} />
        </div>

        <div className="flex space-x-4 w-full">
          <button
            onClick={() => setOpenAccept?.(true)}
            className="flex items-center bg-teal text-white rounded-3xl py-2 px-4 text-sm font-sans font-medium hover:shadow-md"
          >
            <span className="mr-2">
              <SvgLike />
            </span>
            Accept
          </button>

          <button
            onClick={() => setOpenReject?.(true)}
            className="flex space-x-4 items-center bg-neutral-100 text-[#000] rounded-3xl py-2 px-4 text-sm font-sans font-medium hover:shadow-md"
          >
            <span className="mr-2">
              <SvgDislike />
            </span>
            Decline
          </button>

          <button
            onClick={() => setOpenView(true)}
            className="flex space-x-4 items-center bg-neutral-100 text-[#000] rounded-3xl py-2 px-4 text-sm font-sans font-medium hover:shadow-md"
          >
            <SvgOpenPassword />
          </button>
        </div>
      </div>
    </>
  );
};
