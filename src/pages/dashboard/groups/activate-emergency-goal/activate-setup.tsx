import { ActionModal } from '@/components/modal/action-modal';
import React, { useEffect, useState } from 'react';
import { Step1 } from './admin-flow/step-1';
import { Step2 } from './admin-flow/step-2';
import { AddSignatory } from './admin-flow/add-signatory';
import { ActivateContext, activateFormData, activateSteps } from './activate-context';
import { useApi } from '@/helpers/api';
import { useMessagesStore } from '@/store/messages';
import { useNavigate, useParams } from 'react-router-dom';

export const ActivateSetup: React.FC<{ open?: boolean; setOpen?: (open: boolean) => void; goalId?: string }> = ({
  open,
  setOpen,
  goalId,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { displayMessage } = useMessagesStore();
  const [form, setForm] = useState<activateFormData>({});
  const [step, setStep] = useState<activateSteps>(activateSteps.STEP_1);
  const { submit: activateGoal, isLoading: isActivatingGoal } = useApi('/group/goal/activate', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Emergency goal activated successfully',
        variant: 'success',
      });
      navigate(`/dashboard/groups/${params.refId}/${goalId ? goalId : ''}`);
      setOpen?.(false);
    },
  });

  function getActionName(step: activateSteps) {
    if (step === activateSteps.STEP_2) {
      return 'set up signatories';
    }
    if (step === activateSteps.ADD_SIGNATORIES) {
      return 'activate';
    }
    return 'continue';
  }

  function close(isOpen: boolean) {
    setForm({});
    setOpen?.(isOpen);
  }

  useEffect(() => {
    if (open === true) {
      setStep(activateSteps.STEP_1);
    }
  }, [open]);

  return (
    <ActionModal
      heading="Activate Emergency goal"
      open={open}
      setOpen={close}
      hideCancel
      className="lg:w-[536px]"
      buttonposition={step === activateSteps.ADD_SIGNATORIES ? '' : 'text-center'}
      action={getActionName(step)}
      showGoBack={step === activateSteps.ADD_SIGNATORIES}
      goBackButtonProps={{
        onClick: () => {
          if (step === activateSteps.ADD_SIGNATORIES) {
            setStep(activateSteps.STEP_2);
          }
        },
      }}
      actionButtonProps={{
        onClick: () => {
          if (step === activateSteps.STEP_1) {
            setStep(activateSteps.STEP_2);
          }
          if (step === activateSteps.STEP_2) {
            setStep(activateSteps.ADD_SIGNATORIES);
          }
          if (step === activateSteps.ADD_SIGNATORIES) {
            activateGoal({
              goal: goalId,
              signatories: form.signatories,
            });
          }
        },
        disabled: (() => {
          if (step === activateSteps.ADD_SIGNATORIES) {
            return !form.signatories;
          }
        })(),
        loading: isActivatingGoal,
      }}
    >
      <ActivateContext.Provider value={{ form, step, setStep, setForm }}>
        <Step1 />
        <Step2 />
        <AddSignatory />
      </ActivateContext.Provider>
    </ActionModal>
  );
};
