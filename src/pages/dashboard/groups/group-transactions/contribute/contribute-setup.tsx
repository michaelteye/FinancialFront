import { AxiosError } from 'axios';
import { useApi } from '@/helpers/api';
import { useAuthStore } from '@/store/auth';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SuccesModal } from '@/components/success-modal';
import { ActionModal } from '@/components/modal/action-modal';
import { GroupGoalsData, primaryDetails, userGroup } from '../../components/types';

import { ContributeErrorMessage } from './conftribute-form/contribute-error';
import { ContributeContext } from './contribute-context';
import { Pin } from './conftribute-form/pin';
import { Loading } from './conftribute-form/loading';
import GroupLists from './conftribute-form/group-list';
import { GroupGoalList } from './conftribute-form/group-saving-list';
import { ContributeDetails } from './conftribute-form/contribute-details';
import { ContributeError, ContributeFormContext, ContributeProps, ContributeSteps } from '../../lib/types';
import { getPrimaryGoalTopupError } from '../../lib';

function resolveHeading(step: string, selectedGoalName?: string) {
  if (step === ContributeSteps.SELECT_GOAL) {
    return 'Make a contribution to a group saving';
  }
  if (step === ContributeSteps.FORM_DETAILS) {
    return `Select a Payment Type into ${selectedGoalName} account`;
  }
  if (step === ContributeSteps.PIN) {
    return ' Yout Bezo Pin';
  }
  return null;
}

export function resolveContributeErrorType(message: string) {
  if (message.match(/pin/)) {
    return ContributeError.PIN;
  }

  return ContributeError.UNKNOWN;
}

function resolveStep(params: any): ContributeSteps {
  if (params.goalId) {
    return ContributeSteps.FORM_DETAILS;
  }

  if (params.refId) {
    return ContributeSteps.SELECT_GOAL;
  }

  return ContributeSteps.SELECT_GOAL;
}

export const ContributeSetup: React.FC<ContributeProps> = ({
  open,
  setOpen,
  groupGoals = [],
  groups,
  goalPrimaryDetails,
  goalDetails,
}) => {
  const params = useParams();
  const { userProfile } = useAuthStore();
  const [error, setError] = useState<ContributeError>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<ContributeFormContext>({});
  const [errorMessage, setErrorMessage] = useState<string>();
  const [step, setStep] = useState<ContributeSteps>(resolveStep(params));
  const [selectedGroupGoal, setSelectedGroupGoal] = useState<GroupGoalsData | undefined>();
  const { submit: makeContribution } = useApi('/group/deposit', {
    onSuccess() {
      setOpen?.(false);
      setShowSuccess(true);
      setInterval(() => {
        // fetchSavingGoals();
      }, 5000);
    },
    onError(error: AxiosError) {
      const errorType = resolveContributeErrorType(error?.response?.data?.message);
      setStep(ContributeSteps.ERROR);

      if (errorType === ContributeError.PIN) {
        setStep(ContributeSteps.PIN);
        setError(ContributeError.PIN);

        return;
      }

      if (errorType === ContributeError.UNKNOWN) {
        setStep(ContributeSteps.ERROR);
        setError(error?.response?.data?.message);
        return;
      }
    },
  });

  function close(isOpen: boolean) {
    setForm({});
    setOpen?.(isOpen);
    setError(undefined);
    setErrorMessage(undefined);
    setSelectedGroupGoal(undefined);
    if (params.goalId) {
      setStep(ContributeSteps.FORM_DETAILS);
      setSelectedGroupGoal(goalDetails);
    } else {
      setStep(ContributeSteps.SELECT_GOAL);
    }
  }

  useEffect(() => {
    if (params.goalId) {
      setSelectedGroupGoal(goalDetails);
    }
  }, []);

  return (
    <>
      <SuccesModal
        open={showSuccess}
        setOpen={setShowSuccess}
        closeButtonProps={{
          onClick() {
            close(false);
            setShowSuccess(false);
          },
          children: 'Done',
        }}
        actionButtonProps={{
          children: 'View Transaction',
        }}
        closeVariant="primary"
        title="Processing"
        message={`Your payment of GHS ${form.amount} is being processed.`}
      />
      <ActionModal
        open={open}
        setOpen={(isOpen) => {
          // if (ContributeSteps.LOADING === step) {
          //   return;
          // }

          close(isOpen);
        }}
        heading={resolveHeading(step, selectedGroupGoal?.goalName)}
        hideHeader={[ContributeSteps.LOADING, ContributeSteps.ERROR].includes(step)}
        hideCancel={[ContributeSteps.LOADING, ContributeSteps.PIN, ContributeSteps.ERROR].includes(step)}
        hideContinue={[ContributeSteps.LOADING, ContributeSteps.ERROR].includes(step)}
        showGoBack={[ContributeSteps.PIN, ContributeSteps.FORM_DETAILS].includes(step)}
        goBackButtonProps={{
          onClick: () => {
            if (step === ContributeSteps.FORM_DETAILS) {
              setStep(ContributeSteps.SELECT_GOAL);
            }
            if (step === ContributeSteps.PIN) {
              setStep(ContributeSteps.FORM_DETAILS);
            }
          },
        }}
        actionButtonProps={{
          onClick: () => {
            if (step === ContributeSteps.SELECT_GOAL) {
              setStep(ContributeSteps.FORM_DETAILS);
            }
            if (step === ContributeSteps.FORM_DETAILS) {
              setStep(ContributeSteps.PIN);
            }
            if (step === ContributeSteps.PIN) {
              makeContribution({
                amount: form.amount,
                phoneNumber: userProfile?.phone,
                pin: form.pin,
                goalId: params.goalId ? params.goalId : selectedGroupGoal?._id,
                refId: form.groupRefId,
                depositFrom: form.paymentType,
              });

              setStep(ContributeSteps.LOADING);
            }
          },
          disabled: (() => {
            if (ContributeSteps.SELECT_GOAL === step) {
              return !selectedGroupGoal;
            }
            if (ContributeSteps.PIN === step) {
              return !form.pin;
            }

            if (ContributeSteps.FORM_DETAILS === step) {
              const primaryGoalTopUpError = getPrimaryGoalTopupError(
                form.amount!,
                goalPrimaryDetails ? goalPrimaryDetails.balance : '0',
                form.paymentType!
              );

              if (errorMessage) {
                return true;
              }

              return !form.amount || !!primaryGoalTopUpError || !form.paymentType;
            }

            if (ContributeSteps.LOADING === step) {
              return true;
            }

            return false;
          })(),
          loading: step === ContributeSteps.LOADING,
        }}
      >
        <ContributeContext.Provider
          value={{
            step,
            form,
            groups,
            setStep,
            setOpen,
            setForm,
            error,
            errorMessage,
            setErrorMessage,
            setError,
            groupGoals,
            selectedGroupGoal,
            setSelectedGroupGoal,
          }}
        >
          <Pin />
          <Loading />
          <GroupLists />
          <GroupGoalList />
          <ContributeDetails
            primaryGoalBalance={selectedGroupGoal?.primaryAccount?.balance}
            goalPrimaryDetails={goalPrimaryDetails}
          />
          <ContributeErrorMessage message="Our team is currently looking into this please try again now or later." />
        </ContributeContext.Provider>
      </ActionModal>
    </>
  );
};
