import { useApi } from '@/helpers/api';
import { format } from 'date-fns/esm';
import { resolveMaxStep } from '../lib';
import { differenceInDays } from 'date-fns';
import { Spacer } from '@/components/spacer';
import { GroupGoalType } from './group-goal-type';
import React, { useEffect, useState } from 'react';
import { useMessagesStore } from '@/store/messages';
import { CreateSavingGoalProps } from '../lib/types';
import { useParams } from 'react-router-dom';
import { CreateGroupSavingsForm } from '../components/types';
import { CreateGoalProgressBar } from '../components/progress-bar';
import { AdvanceOption } from './organisational-group-saving/advance-option';
import { DefaultGoalEmojis } from './default-group-saving/default-goal-emojis';
import { SplitShareEmojis } from './split-pay-group-saving/split-share-emojis';
import { SplitShareDetails } from './split-pay-group-saving/split-share-details';
import { RotationalGoalEmojis } from './rotational-group-saving/rotational-emojis';
import { SplitShareDuration } from './split-pay-group-saving/split-share-duration';
import { DefaultGoalDuration } from './default-group-saving/default-goal-duration';
import { DefaultSavingDetails } from './default-group-saving/default-saving-details';
import { GoalVerificationModal } from '../components/modals/goal-verification-modal';
import { RotationalGoalDuration } from './rotational-group-saving/rotational-duration';
import { RotationalGoalDetails } from './rotational-group-saving/rotational-goal-details';
import { CreateSavingsGoalLayout } from '../../savings/components/create-savings-goal-layout';
import { OrganizationalGoalEmojis } from './organisational-group-saving/organizational-emojis';
import { RotationalPickWithdrawalDate } from './rotational-group-saving/rotational-withdrawal-date';
import { OrganizationalGoalDuration } from './organisational-group-saving/organizational-duration';
import { OrganizationalGoalDetails } from './organisational-group-saving/organizational-goal-details';
import { CreateGroupSavingsGoalFormContext, defaultFirstStep } from './create-group-goal-context';

export const CreateGroupSavingGoal: React.FC<CreateSavingGoalProps> = ({ open, setOpen, fetchSavingGoals }) => {
  const params = useParams();
  const { displayMessage } = useMessagesStore();
  const [step, setStep] = useState(defaultFirstStep);
  const [stepChange, setStepChange] = useState(false);
  const [form, setForm] = useState<CreateGroupSavingsForm>({});
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const setValue = (key: keyof CreateGroupSavingsForm, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const { submit: createSavingsGoal, isLoading: isCreatingSavingGoal } = useApi('/user/groups/saving-goals', {
    onSuccess() {
      displayMessage({
        title: 'Successfull!',
        description: `${form.nature} goal created successfully`,
        variant: 'success',
      });
      setOpen?.(false);
      setStep(defaultFirstStep);
      setForm({});
      fetchSavingGoals?.();
    },
    onError() {
      displayMessage({
        title: 'Failed!',
        description: 'Something went wrong, Please try again later',
        variant: 'error',
      });
    },
  });

  const { submit: createRotationalGoal, isLoading: isCreatingRotationalGoal } = useApi(
    '/user/groups/saving-goals/rotational',
    {
      onSuccess(response) {
        displayMessage({
          title: 'Successfull!',
          description: `Rotational goal created successfully`,
          variant: 'success',
        });
        showNextStep();
        setForm({
          ...form,
          rotationalRefId: response.data.data.savingsGoalsData._id,
        });
        close();
        fetchSavingGoals?.();
      },
      onError() {
        displayMessage({
          title: 'Failed!',
          description: 'Something went wrong, Please try again later',
          variant: 'error',
        });
      },
    }
  );

  const daysDifference = differenceInDays(new Date(form.endDate!), new Date());

  const daysToMonths = parseFloat((daysDifference / 30)?.toFixed(2))?.toString();

  const handleSubmit = () => {
    createSavingsGoal({
      accountType: form?.accountType,
      amountToSave: form?.amountToSave,
      description: form?.description,
      frequency: form?.frequency,
      goalName: form?.goalName,
      goalPeriod: form.goalPeriod === 'custom' ? daysToMonths : form?.goalPeriod,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(form?.endDate!), 'yyyy-MM-dd'),
      lockSavings: true,
      nature: form?.nature,
      emoji: form.emoji,
      refId: params.refId,
      signatories: form.nature === 'Default' ? form?.signatories : null,
      subscriptionType: form?.subscriptionType,
    });
  };

  const submitRotationalGoalData = () => {
    createRotationalGoal({
      accountType: form.accountType,
      amountToSave: form?.amountToSave,
      frequency: form.frequency,
      goalName: form.goalName,
      goalPeriod: form?.goalPeriod,
      lockSavings: true,
      nature: 'Rotational',
      refId: params.refId,
      slots: form.slots,
      emoji: form.emoji,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      subscriptionType: 'custom',
      withdrawalFrequency: form.withdrawalFrequency,
    });
  };

  const maxStep = resolveMaxStep(form?.nature!);

  const showNextStep = () => {
    if (step < maxStep!) {
      setStep((currentStep) => currentStep + 1);
    }
    return;
  };

  const showPrevStep = () => {
    setStep((previouStep) => previouStep - 1);
  };

  useEffect(() => {
    if (stepChange) {
      setStep(1);
    }
  }, [stepChange]);

  return (
    <>
      <GoalVerificationModal open={openVerifyModal} setOpen={setOpenVerifyModal} />

      <CreateGroupSavingsGoalFormContext.Provider
        value={{
          step,
          setStep,
          form,
          setForm,
          setValue,
          stepChange,
          setStepChange,
          showNextStep,
          showPrevStep,
        }}
      >
        <CreateSavingsGoalLayout
          title="Create a saving goal"
          open={open}
          closeModal={() => {
            setOpen!(false);
            setForm({});
            setStep(defaultFirstStep);
          }}
        >
          <Spacer className="h-12" />

          <CreateGoalProgressBar />

          <GroupGoalType />

          {/* // *********** DEFAULT ************ // */}

          <DefaultSavingDetails />
          <DefaultGoalDuration />
          <DefaultGoalEmojis onNextClick={handleSubmit} loading={isCreatingSavingGoal} />

          {/* ******* SPLIT AND SHARE  */}

          <SplitShareDetails />
          <SplitShareDuration />
          <SplitShareEmojis onNextClick={handleSubmit} />

          {/* ********* ROTATIONAL ******** */}

          <RotationalPickWithdrawalDate
            closeModal={() => {
              setOpen?.(false);
              fetchSavingGoals?.();
            }}
          />
          <RotationalGoalDetails />
          <RotationalGoalDuration />
          <RotationalGoalEmojis
            onNextClick={() => {
              submitRotationalGoalData();
            }}
            loading={isCreatingRotationalGoal}
          />

          {/*  ********** ORGANIZATIONAL ********* */}
          <AdvanceOption />
          <OrganizationalGoalEmojis
            setOpenVerifymodal={() => {
              setOpen?.(false);
              setOpenVerifyModal(true);
            }}
            onNextClick={handleSubmit}
          />
          <OrganizationalGoalDetails />
          <OrganizationalGoalDuration />
        </CreateSavingsGoalLayout>
      </CreateGroupSavingsGoalFormContext.Provider>
    </>
  );
};
