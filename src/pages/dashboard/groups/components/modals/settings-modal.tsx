import { RadioInput } from '@/components/input/radio-input';
import { ActionModal } from '@/components/modal/action-modal';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SettingMemberProps } from '../types';

export const SettingsModal: React.FC<SettingMemberProps> = ({ open, setOpen, memberInfo }) => {
  const params = useParams();
  const { displayMessage } = useMessagesStore();
  const [role, setRole] = useState<'signatory' | 'admin' | 'user'>('user');
  const { submit: assignGoalMemberRole, isLoading: isAssigningGoalMemberRoles } = useApi('/group/goal/signatories', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Role Assigned Successfully',
        variant: 'success',
      });
      setOpen?.(false);
    },
    onError(response) {
      displayMessage({
        title: 'Failed',
        description: response.response?.data.message,
        variant: 'error',
      });
      setOpen?.(false);
    },
  });

  const { submit: assignGroupMemberRole, isLoading: isAssigningGroupMemberRoles } = useApi('/group/admins', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Role Assigned Successfully',
        variant: 'success',
      });
      setOpen?.(false);
    },
    onError(response) {
      displayMessage({
        title: 'Failed',
        description: response.response?.data.message,
        variant: 'error',
      });
      setOpen?.(false);
    },
  });

  function handleAssignGoalMemberRoleClick() {
    assignGoalMemberRole({
      user: memberInfo?.user_id,
      goal: memberInfo?.goal_id,
      group: memberInfo?.group_id,
      role,
    });
  }

  function handleAssingGroupMemberRoles() {
    assignGroupMemberRole({
      admin: memberInfo?.user_id,
      refId: params.refId,
      role,
    });
  }
  return (
    <>
      <ActionModal
        open={open}
        setOpen={setOpen}
        heading="Member settings"
        action="Done"
        className="text-left max-w-[530px]"
        actionButtonProps={{
          onClick: () => {
            if (!params.goalId) {
              handleAssingGroupMemberRoles();
            } else {
              handleAssignGoalMemberRoleClick();
            }
          },
          loading: isAssigningGoalMemberRoles || isAssigningGroupMemberRoles,
        }}
      >
        <Spacer className="h-4" />

        <div className="flex flex-col px-7 border-b border-b-[#ECF1F4]">
          <p className="font-sans text-neutral-500 text-sm">Member group privilege</p>

          <div className="flex flex-col space-y-3">
            <RadioInput
              nobgColor
              id={!params.goalId ? 'admin' : 'signatory'}
              text={!params.goalId ? 'Admin' : 'Signatory'}
              name="member-privilege"
              description="Member will be able to make withdrawals , edit, delete and create groups members"
              checked={!params.goalId ? role === 'admin' : role === 'signatory'}
              className="lg:mr-0 mt-2"
              onChange={() => {
                if (!params.goalId) {
                  setRole('admin');
                } else {
                  setRole('signatory');
                }
              }}
            />
            <RadioInput
              nobgColor
              id="contributor"
              text="Contributor"
              name="member-privilege"
              description="This is the default all added members. This privilege allows them to only make contributions and receive payouts."
              className="lg:mr-0 mt-2"
              checked={role === 'user'}
              onChange={() => {
                setRole('user');
              }}
            />
          </div>
          <Spacer className="h-8" />
        </div>
      </ActionModal>
    </>
  );
};
