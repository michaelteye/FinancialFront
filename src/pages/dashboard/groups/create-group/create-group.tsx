import React, { useState } from 'react';
import { Spacer } from '@/components/spacer';
import SvgSuccess from '@/components/icons/Success';
import { AboutGroup } from './creat-group-form/about-group';
import { CreateGroupProgressBar } from './components/progess-bar';
import { CreateSavingsGoalLayout } from '../../savings/components/create-savings-goal-layout';
import { CreateGroupFormContext } from './group-form-context';
import { GroupModalLayout } from '../components/modals/modal-layout';
import { useMessagesStore } from '@/store/messages';
import { useApi } from '@/helpers/api';
import { GroupReview } from './creat-group-form/group-review';
import { createGroupForm, CreateGroupFormContextSteps, CreateGroupProps } from '../lib/types';

export const CreateGroup: React.FC<CreateGroupProps> = ({ open, setOpen, onSave }) => {
  const { displayMessage } = useMessagesStore();
  const [form, setForm] = useState<createGroupForm>({});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [step, setStep] = useState(CreateGroupFormContextSteps.ABOUT_GROUP);

  const setValue = (key: keyof createGroupForm, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const { submit: createGroup, isLoading: isCreatingGroup } = useApi('/user/groups', {
    onSuccess() {
      displayMessage({
        title: 'Success!!',
        description: 'Group Created Successfully',
        variant: 'success',
      });
      closeModal();
      onSave?.();
    },
    onError() {
      displayMessage({
        title: 'Error',
        description: (
          <span>
            Sorry, you are not allowed to create a group.
            <br />
            Upgrade your account to an advanced account
          </span>
        ),
        variant: 'error',
      });
    },
  });

  const handleCreateGroup = () => {
    createGroup({
      groupName: form?.groupName,
      description: form?.description,
    });
  };

  const showNextStep = () => {
    {
      step < 2 ? setStep((currentStep) => currentStep + 1) : null;
    }
  };

  const showPrevStep = () => {
    setStep((previouStep) => previouStep - 1);
  };

  const closeModal = () => {
    setOpen!(false);
    setForm({});
    setStep(CreateGroupFormContextSteps.ABOUT_GROUP);
  };
  return (
    <>
      <GroupModalLayout
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        icon={SvgSuccess}
        cancelAction={() => {
          setStep(CreateGroupFormContextSteps.ABOUT_GROUP);
        }}
        headerText={
          <div className="flex flex-col space-x-4">
            <p className="font-sans text-3xl text-green font-semibold">Hurray!</p>
            <p className="font-sans-body text-neutral-400 text-base mt-1">
              You’ve successfully created a savings group!
            </p>
          </div>
        }
      >
        <p className="text-[#252525] font-sans-body text-center px-7">
          You can start by creating a saving goal in your group to achieve with friends and family. Happy saving!
        </p>
      </GroupModalLayout>

      <CreateGroupFormContext.Provider
        value={{
          step,
          setStep,
          form,
          setForm,
          setValue,
          showNextStep,
          showPrevStep,
        }}
      >
        <CreateSavingsGoalLayout title="Create a saving group" open={open} closeModal={() => closeModal()}>
          <Spacer className="h-12" />
          <CreateGroupProgressBar />
          <AboutGroup />
          <GroupReview
            loading={isCreatingGroup}
            setMainModal={() => {
              handleCreateGroup();
            }}
          />
        </CreateSavingsGoalLayout>
      </CreateGroupFormContext.Provider>
    </>
  );
};
