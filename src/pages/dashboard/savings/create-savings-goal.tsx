import add from 'date-fns/add';
import { Spacer } from '@/components/spacer';
import { PropsWithChildren, useEffect, useState } from 'react';

import { CreateSavingsAccountFormContext } from './components/form-context';
import { ProgressBar } from './components/progress-bar';
import { SuccesModal } from '@/components/success-modal';
import { useAuthStore } from '@/store/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import format from 'date-fns/format';
import { CreateSavingsGoalLayout } from './components/create-savings-goal-layout';
import { useMessagesStore } from '@/store/messages';
import { useMutation } from '@tanstack/react-query';
import { SelectGoalType } from './create-savings-form/1-select-goal.type';
import { NameOfSavingsAccount } from './create-savings-form/3-name-of-savings-account';
import { GoalTargetPlan } from './create-savings-form/4-goal-target-plan';
import { Frequency } from './create-savings-form/5-frequency';
import { Emojis } from './create-savings-form/6-emojis';
import { Review } from './create-savings-form/7-review';
import { UserPin } from './create-savings-form/user-pin';
import { LockType } from './create-savings-form/2-lock-type';
import { differenceInDays } from 'date-fns';
import { verifyUserPin } from '@/helpers/verify-user-pin';
import useGoals from '@/hooks/fetch-goal';
import { useApi } from '@/helpers/api';
import { CreateSavingsAccountFormSteps, CreateSavingsGoalProps, SavingsGoalForm } from './helpers/types';
import { useAccountTypes } from '@/hooks/useAccountTypes';
import { LockTypes } from '../tools/types';

export default function CreateSavingsGoal({ open, setOpen, onTopup }: PropsWithChildren<CreateSavingsGoalProps>) {
  const navigate = useNavigate();
  const { refetchGoals } = useGoals();
  const [error, setError] = useState<string>();
  const { displayMessage } = useMessagesStore();
  const { data: accountTypes } = useAccountTypes();
  const [submitting, setSubmitting] = useState(false);
  const { selectedWallet, userProfile } = useAuthStore();
  const [openPinModal, setOpenPinModal] = useState(false);
  const [_, setSearchParams] = useSearchParams();
  const [createGoalData, setCreateGoalData] = useState({});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isCreatingSavingsGoal, setIsCreatingSavingsGoal] = useState(false);
  const [step, setStep] = useState(CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE);

  const defaultForm: () => SavingsGoalForm = () => ({
    goalType: '',
    goalName: '',
    lockSavings: false,
    startDate: new Date(),
    endDate: new Date(),
    accountType: {},
    goalTypeId: '',
    emoji: '',
    goalPeriod: '',
    amountToSave: '',
    frequency: '',
    acceptsInterest: 'Yes',
    amountToRaise: '',
    depositPreference: 'manual',
  });

  const [form, setForm] = useState<SavingsGoalForm>(defaultForm());

  const setValue = (key: keyof SavingsGoalForm, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const startDate = form.startDate ? format(new Date(form.startDate!), 'yyyy-MM-dd') : '';
  const endDate = form.endDate ? format(new Date(form.endDate!), 'yyyy-MM-dd') : '';
  const period = differenceInDays(new Date(endDate!), new Date(startDate));
  const BezoFlex = accountTypes?.filter((account) => account.name === LockTypes.BEZO_FLEX)[0];

  async function intitiateCreateGoal() {
    setIsCreatingSavingsGoal(true);
    try {
      const response = await verifyUserPin(form.userPin);
      setIsCreatingSavingsGoal(false);

      const verificationId = response.data.verificationId;

      setCreateGoalData({
        name: form.goalName,
        period,
        endDate,
        startDate,
        frequency: form.frequency,
        verificationId,
        goalTypeId: form.goalTypeId,
        walletId: selectedWallet?.id,
        amount: Number(form.amountToRaise),
        amountToSave: Number(form.amountToSave),
        emoji: form.emoji,
        preference: form.depositPreference,
        user: userProfile?.user?.user_id,
        category:form.category,
        // accountTypeAlias: BezoFlex?.alias,
        // accountTypeName: BezoFlex?.name,
        // accountTypeId: BezoFlex?.id,
        accountTypeAlias: form.accountType?.alias,
        accountTypeName: form.accountType?.name,
        accountTypeId: form?.accountType?.id,
        interest: form.acceptsInterest,
      });
    } catch (error) {
      setIsCreatingSavingsGoal(false);
      setError('Please provide a valid pin');
      setStep(CreateSavingsAccountFormSteps.USER_PIN);
    }
  }

  const { submit: createSavingGoal } = useApi('/users/saving-goals', {
    onSuccess(response) {
      setOpen?.(false);
      setSubmitting(false);
      setOpenPinModal(false);
      refetchGoals();

      setOpenSuccessModal(true);

      setStep(CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE);

      navigate('/dashboard/savings');
    },
    onError(error) {
      const errMessage = error?.response?.data?.message;
      setSubmitting(false);
      if (errMessage) {
        setError(errMessage);
      }
      displayMessage({
        title: 'Failed',
        description:
          errMessage === 'Savings Goal already exist'
            ? //@ts-ignore
              `A savings goal with name ${createGoalData.name}, already exist`
            : 'Something went wrong, please try again later',
        variant: 'error',
      });
    },
  });
  // const { mutate: createSavingGoal } = useMutation(
  //   () =>
  //     createPrivateApi({
  //       url: '/users/saving-goals',
  //       data: createGoalData,
  //     }),
  //   {
  //     onSuccess: () => {
  //       setOpen?.(false);
  //       setSubmitting(false);
  //       setOpenPinModal(false);
  //       refetchGoals();
  //       setOpenSuccessModal(true);

  //       setStep(CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE);

  //       navigate('/dashboard/savings');
  //     },
  //     onError: (error: any) => {
  //       setSubmitting(false);
  //       if (error?.response?.data?.message) {
  //         setError(error?.response?.data?.message);
  //       }
  //       displayMessage({
  //         title: 'Failed',
  //         description: 'Something went wrong, please try again later',
  //         variant: 'error',
  //       });
  //     },
  //     onSettled: async () => {
  //       await queryClient.invalidateQueries(['saving-goals']);
  //     },
  //   }
  // );

  useEffect(() => {
    //@ts-ignore
    if (createGoalData.verificationId) {
      createSavingGoal(createGoalData);
    }
    //@ts-ignore
  }, [createGoalData.verificationId]);

  const showNextStep = () => {
    {
      step < 7 ? setStep((currentStep) => currentStep + 1) : null;
    }
  };

  const showPreviousStep = () => {
    setStep((previouStep) => previouStep - 1);
  };

  const closeModal = () => {
    setOpen?.(false);
    setStep(CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE);
    setForm(defaultForm());
    setSearchParams({});
  };

  return (
    <CreateSavingsAccountFormContext.Provider
      value={{
        form,
        step,
        setStep,
        setValue,
        setForm,
        setOpen,
        submitting,
        setSubmitting,
        showNextStep,
        showPreviousStep,
      }}
    >
      <SuccesModal
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        actionButtonProps={{
          children: 'Make deposit',
          onClick() {
            onTopup?.();
          },
        }}
        message="You have successfully created your savings goal. Start reaching it by making your first deposit."
        closeButtonProps={{
          onClick() {
            setOpenSuccessModal(false);
            setForm(defaultForm());
          },
        }}
      />

      <UserPin
        openPinModal={openPinModal}
        hideCancel={false}
        setOpenPinModal={setOpenPinModal}
        onSubmit={intitiateCreateGoal}
        submitting={isCreatingSavingsGoal}
        error={error?.match(/pin/) ? error : undefined}
        form={form}
        message="Please enter your BezoPin to create a new saving goal:"
        onChange={(pin) => {
          setValue('userPin', pin), setError('');
        }}
      />

      <CreateSavingsGoalLayout open={open} closeModal={closeModal}>
        <Spacer className="h-12" />

        <ProgressBar />
        <SelectGoalType />
        <NameOfSavingsAccount />
        <GoalTargetPlan />
        <Frequency />
        <LockType />
        <Emojis />
        <Review
          setUserPinModalOpen={() => {
            setOpen?.(false);
            setOpenPinModal(true);
          }}
        />
      </CreateSavingsGoalLayout>
    </CreateSavingsAccountFormContext.Provider>
  );
}
