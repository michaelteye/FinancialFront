import { useState } from 'react';
import classNames from 'classnames';
import { useApi } from '@/helpers/api';
import { useParams } from 'react-router-dom';
import { Spacer } from '@/components/spacer';
import { EditGroupProps } from '../lib/types';
import { Input } from '@/components/input/input';
import { useMessagesStore } from '@/store/messages';
import { ActionButtons } from '../../savings/components/action-buttons';
import { CreateSavingsGoalLayout } from '../../savings/components/create-savings-goal-layout';

export const EditGroup: React.FC<EditGroupProps> = ({ open, setOpen, groupName, fetchGroupDetails }) => {
  const params = useParams();
  const { displayMessage } = useMessagesStore();
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const { submit: editGroup, isLoading: isEditingGroup } = useApi(`/group/edit`, {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Group data edited successfully',
        variant: 'success',
      });
      setOpen?.(false);
      fetchGroupDetails?.();
    },
  });

  function handleClick() {
    editGroup({
      name: newGroupName,
      description: newGroupDescription,
      ref: params.refId,
    });
  }
  return (
    <CreateSavingsGoalLayout title="Edit Group" width="md:w-[45%]" open={open} closeModal={() => setOpen?.(false)}>
      <Spacer className="h-10" />

      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">Edit {groupName}</h1>

      <Spacer className="h-6" />

      <Input
        error=""
        label="Saving group name"
        placeholder="eg. Class of 2021"
        onChange={(event) => setNewGroupName(event.target.value)}
      />

      <Spacer className="h-6" />

      <label className="font-sans font-semibold text-sm text-neutral-400" htmlFor="group-description">
        Group description
      </label>

      <Spacer className="h-1" />

      <textarea
        className={classNames('box-border w-full rounded-lg focus:outline-none p-4 border ')}
        id="group-description"
        cols={5}
        rows={3}
        placeholder="eg. Class of 2021"
        onChange={(event) => {
          setNewGroupDescription(event.target.value);
        }}
      />

      <ActionButtons
        hideCancel
        padding=""
        continueText="Update Group Info"
        onNext={() => handleClick()}
        loading={isEditingGroup}
      />
    </CreateSavingsGoalLayout>
  );
};
