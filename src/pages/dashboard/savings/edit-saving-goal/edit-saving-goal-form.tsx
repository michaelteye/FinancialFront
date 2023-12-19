import { Emojis } from './emojis';
import { EditReview } from './edit-review';
import { Spacer } from '@/components/spacer';
import { GoalDetails } from './goal-details';
import SvgClose from '@/components/icons/Close';
import { EditProgressBar } from './progress-bar';
import { RequestMethod, useApi } from '@/helpers/api';
import { Dialog, Transition } from '@headlessui/react';
import { SuccesModal } from '@/components/success-modal';
import React, { Fragment, useEffect, useState } from 'react';
import { editSavingsGoalFormContext } from './edit-goal-context';

import add from 'date-fns/add';
import { CloseGoal } from '@/components/icons';
import { useMessagesStore } from '@/store/messages';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionModal } from '@/components/modal/action-modal';

import useGoals from '@/hooks/fetch-goal';
import { differenceInCalendarDays } from 'date-fns';
import { UserPin } from '../create-savings-form/user-pin';
import { EditSavingGoalFormProps, editSavingGoalSteps, SavingsGoalForm } from '../helpers/types';
import { Notice } from '@/components/flash/flash';
import { useQueryClient } from '@tanstack/react-query';

export const EditSavingsGoalForm: React.FC<EditSavingGoalFormProps> = ({ open, setOpen, savingGoalData }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { refetchGoals } = useGoals();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();
  const { displayMessage } = useMessagesStore();
  const [submitting, setSubmitting] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [step, setStep] = useState(editSavingGoalSteps.GOAL_DETAILS);
  const [openCloseGoalModal, setOpenCloseGoalModal] = useState(false);

  function stringToAmount(amount: string) {
    amount = amount?.toString();

    if (amount?.includes('.')) {
      return amount?.split('.')[0];
    }

    return amount;
  }

  function retrivePeriodInStringFormat(period: number) {
    if (period < 33 && period > 27) {
      return '1 month';
    }
    if (period < 93 && period > 87) {
      return '3 months';
    }
    if (period < 183 && period > 177) {
      return '6 months';
    }
    if (period < 279 && period > 266) {
      return '9 months';
    }
  }

  function defaultFormData() {
    let endDate =
      savingGoalData?.endDate === 'unlimited'
        ? add(new Date(), {
            years: 100,
          })
        : new Date(savingGoalData?.endDate!);

    return {
      savingGoalName: savingGoalData?.name,
      startDate: savingGoalData?.startDate ? new Date(savingGoalData?.startDate!) : new Date(),
      endDate,
      emoji: savingGoalData?.emoji,
      goalType: savingGoalData?.savingGoal,
      goalPeriod: retrivePeriodInStringFormat(savingGoalData?.period!),
      amountToSave: stringToAmount(savingGoalData?.amountToSave!),
      frequency: savingGoalData?.frequency,
      amountToRaise: stringToAmount(savingGoalData?.amountToRaise!),
      depositPreference: savingGoalData?.preference,
      walletId: savingGoalData?.account?.walletId,
      goalTypeId: savingGoalData?.goalType?.id,
      accountTypeId: savingGoalData?.account?.accountTypeId,
      accountTypeName: savingGoalData?.accountTypeName,
      accountTypeAlias: savingGoalData?.accountTypeAlias,
      isFavorite: savingGoalData?.isFavorite,
      period: savingGoalData?.period,
      amount: Number(savingGoalData?.account?.balance),
    };
  }

  const [form, setForm] = useState<SavingsGoalForm>({});

  useEffect(() => {
    if (open === true) {
      setForm(defaultFormData());
    }
  }, [open]);

  const { submit: closeSavingGoal, isLoading: isClosingGoal } = useApi(`/users/saving-goals/${params.savingsId}`, {
    method: RequestMethod.DELETE,
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Savings goal removed successfully',
        variant: 'success',
      });
      refetchGoals();
      setOpenCloseGoalModal(false);
      navigate('/dashboard/savings');
    },
    onError() {
      displayMessage({
        title: 'Failed',
        description: 'Something went wrong, please try again later',
        variant: 'error',
      });
    },
  });

  const { submit: updateSavingGoal } = useApi(`/users/saving-goals/${params.savingsId}`, {
    onSuccess() {
      setOpen?.(false);
      setSubmitting(false);
      setOpenPinModal(false);

      setOpenSuccessModal(true);

      setStep(editSavingGoalSteps.GOAL_DETAILS);
      queryClient.invalidateQueries(['saving-goals-details', params.savingsId]);
    },
    onError(error) {
      setSubmitting(false);
      if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      }
    },
    method: RequestMethod.PUT,
  });

  const setValue = (key: keyof SavingsGoalForm, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  console.log(savingGoalData);

  const showNextStep = () => {
    {
      step < 3 ? setStep((currentStep) => currentStep + 1) : null;
    }
  };

  const showPrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  function updateSavingGoalData() {
    setSubmitting(true);

    updateSavingGoal({
      ...defaultFormData(),
      goal: params?.savingsId,
      name: form.savingGoalName,
      emoji: form.emoji,
      amountToSave: Number(form.amountToSave),
      preference: form.depositPreference,
    });
  }

  const daysLeft = differenceInCalendarDays(new Date(form?.endDate!), new Date());

  if (!savingGoalData) {
    return null;
  }

  return (
    <>
      <ActionModal
        open={openCloseGoalModal}
        setOpen={setOpenCloseGoalModal}
        modalWidth="lg:w-[530px] max-w-[530px]"
        hideCancel
        buttonposition="text-center"
        action="Yes, close my saving goal"
        actionButtonProps={{
          onClick: () => {
            closeSavingGoal({
              goal: params.savingsId,
            });
          },
          loading: isClosingGoal,
          className: 'bg-[#FF5029] hover:bg-[#FF5029] hover:bg-opacity-[0.85]',
        }}
        heading={
          <div className="flex items-center space-x-2">
            <CloseGoal />
            <p>Warning</p>
          </div>
        }
      >
        <Spacer className="h-5" />

        {daysLeft > 0 ? (
          <div className="px-7">
            {' '}
            <Notice text="You'll be charged 3% if you process closing your goal" />
          </div>
        ) : null}

        <Spacer className="h-5" />

        <div className="flex flex-col space-y-4 px-7 border-b border-neutral-100">
          <p className="text-neutral-400 font-sans font-medium">Are you sure you want to close this goal.</p>

          <p className="text-neutral-400 font-sans text-sm font-medium text-center">
            This action is irreversible and the goal will be deleted from your BezoSusu account. Any money left will be
            sent to your BezoWallet
          </p>

          <Spacer className="h-5" />
        </div>
      </ActionModal>

      <editSavingsGoalFormContext.Provider
        value={{
          form,
          step,
          setStep,
          setValue,
          showPrevStep,
          showNextStep,
          setForm,
        }}
      >
        <SuccesModal
          open={openSuccessModal}
          setOpen={setOpenSuccessModal}
          message="You have successfully updated a saving goal."
          closeButtonProps={{
            onClick() {
              setOpenSuccessModal(false);
            },
          }}
        />

        <UserPin
          openPinModal={openPinModal}
          setOpenPinModal={setOpenPinModal}
          onSubmit={updateSavingGoalData}
          error={error?.match(/pin/) ? error : undefined}
          submitting={submitting}
          form={form}
          message="Please enter your BezoPin to update your saving goal:"
          onChange={(pin) => setValue('userPin', pin)}
        />
        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" className={'fixed z-40 top-0 lg:w-[56.5%] w-full right-0'} onClose={() => setOpen?.(false)}>
            <div className="min-h-screen">
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-20 z-[-10]" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-full transition-all transform bg-white shadow-xl h-screen p-8 lg:rounded-tl-3xl lg:rounded-bl-3xl overflow-auto">
                  <div className="w-full flex items-center">
                    <button onClick={() => setOpen?.(false)}>
                      <SvgClose className="mr-3" />
                    </button>

                    <h2 className="text-neutral-900 text-lg font-medium">Edit Saving Goal</h2>
                  </div>

                  <Spacer className="h-12" />

                  <EditProgressBar />
                  <GoalDetails
                    openCloseGoal={() => {
                      setOpen?.(false);
                      setOpenCloseGoalModal(true);
                    }}
                  />
                  <Emojis />
                  <EditReview
                    onContinue={() => {
                      setOpen?.(false);
                      setOpenPinModal(true);
                    }}
                  />
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </editSavingsGoalFormContext.Provider>
    </>
  );
};
