import { useState } from 'react';
import { useApi } from '@/helpers/api';
import { Spacer } from '@/components/spacer';
import { useMessagesStore } from '@/store/messages';
import { DropDown } from '@/pages/dashboard/groups/components/dropdown';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';

import { useParams } from 'react-router-dom';
import { AddMembersProps } from '../lib/types';

export const testNames = [
  'KATI NEVILLE',
  'KATI FRANTZ MIYERKEL',
  'KATI ALFRED',
  'LOUIS KATI',
  'BEATRICE YENUI',
  'KATI FRANTZ MIYERKELOS',
  'KATI FRANZ MIYERKELOS',
];

export const AddMembers: React.FC<AddMembersProps> = ({ groupName, closeModal, fetchInvites }) => {
  const params = useParams();
  const { displayMessage } = useMessagesStore();
  const [makeInputText, setMakeInputText] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>();

  const { submit: AddMembers, isLoading: isAddingMembers } = useApi('/user/groups/add-member', {
    onSuccess(res) {
      const response = res?.data;
      displayMessage({
        title: 'Successfully sent!',
        description: 'Invite Links have been sent to the users',
        variant: response?.status,
      });
      closeModal?.();
      fetchInvites?.();
    },
    onError(response) {
      displayMessage({
        title: 'Failed',
        description: response?.response?.data.message,
        variant: 'error',
      });
    },
  });

  const handleAddMembers = () => {
    AddMembers({
      groupName,
      refId: params.refId,
      phoneNumbers: phoneNumbers,
    });
  };
  return (
    <>
      <Spacer className="h-12" />
      <h4 className="font-sans font-medium text-xl text-neutral-400 mb-1">
        Provide the phone numbers of those you want added to {groupName} group
      </h4>
      <Spacer className="h-6" />
      <DropDown
        id="dropdown"
        noIcon
        open={makeInputText}
        setOpen={setMakeInputText}
        label={`Add a BezoSusu user to the group`}
        subLabel="This is optional and can be done later."
        onChange={(phoneNumbers) => {
          setPhoneNumbers?.(phoneNumbers);
        }}
      />
      <Spacer className="h-3" />
      <p className="text-sm font-sans-body text-neutral-400">
        Input the phoneNumbers of the users you want added to the group and hit the
        <span className="font-semibold text-lg"> 'ENTER'</span> Key
      </p>

      <Spacer className="h-8" />

      <ActionButtons
        loading={isAddingMembers}
        hideCancel
        padding=""
        loadingText="Adding ..."
        continueText="Add Members"
        onNext={() => {
          handleAddMembers();
        }}
        onNextProps={{
          disabled: phoneNumbers?.length === 0,
        }}
      />
    </>
  );
};
