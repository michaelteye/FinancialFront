import { useApi } from '@/helpers/api';
import React, { useState } from 'react';
import { useMessagesStore } from '@/store/messages';
import { resolveWithdrawalErrorType } from '../../lib';
import { SuccesModal } from '@/components/success-modal';
import { WithdrawalContext } from './withdrawal-context';
import { WithdrawPin } from './withdrawal-form/withdraw-pin';
import { ActionModal } from '@/components/modal/action-modal';
import { WithdrawLoading } from './withdrawal-form/withdraw-loading';
import { WithdrawalError } from './withdrawal-form/withdrawal-error';
import { WithdrawalRequest } from './withdrawal-form/withdrawal-request';
import { WithdrawalDetails } from './withdrawal-form/withdrawal-details';
import { withdrawalError, WithdrawalFormData, WithdrawalSetupProps, withdrawalSteps } from '../../lib/types';

export const WithdrawalSetup: React.FC<WithdrawalSetupProps> = ({
  open,
  setOpen,
  goalData,
  fetchPayouts,
  requestData,
  setPinStep,
}) => {
  const { displayMessage } = useMessagesStore();
  const [error, setError] = useState<withdrawalError | string>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<WithdrawalFormData>({});
  const [step, setStep] = useState<withdrawalSteps>(
    setPinStep === false ? withdrawalSteps.WITHDRAWAL_PIN : withdrawalSteps.WITHDRAWAL_REQUEST
  );
  const { submit: makeWithdrawalRequest, isLoading: isMakingWithdrawalRequest } = useApi(
    '/group/goal/withdrawal/request',
    {
      onSuccess() {
        displayMessage({
          title: 'Success',
          description: 'Your Request has been made Successfully. Hold on while the signatories review it',
          variant: 'success',
        });
        setOpen?.(false);
        setForm({});
        setError(undefined);
        fetchPayouts?.();
      },
      onError(response) {
        displayMessage({
          title: 'Not Allowed',
          description: response.response?.data.message,
          variant: 'danger',
        });
        setOpen?.(false);
        setForm({});
        setError(undefined);
      },
    }
  );

  const { submit: withdrawFromSplitAndShare, isLoading: isWithdrawingFromSplitAndShare } = useApi(
    '/group/goal/withdrawal/split-and-share',
    {
      onSuccess() {
        displayMessage({
          title: 'Success',
          description: 'Your withdrawal was initiated successfully',
          variant: 'success',
        });
        setShowSuccess(true);
      },
      onError(response) {
        const errorType = resolveWithdrawalErrorType(response?.response?.data.message);
        setStep(withdrawalSteps.ERROR);

        if (errorType === withdrawalError.PIN) {
          setStep(withdrawalSteps.WITHDRAWAL_PIN);
          setError(withdrawalError.PIN);

          return;
        }

        if (errorType === withdrawalError.UNKNOWN) {
          setStep(withdrawalSteps.ERROR);
          setError(response?.response?.data.message);

          return;
        }
      },
    }
  );

  const { submit: makeWithdrawal, isLoading: isMakingWithdrawal } = useApi('/group/goal/withdrawal', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Your withdrawal was initiated successfully',
        variant: 'success',
      });
      setShowSuccess(true);
    },
    onError(response) {
      const errorType = resolveWithdrawalErrorType(response?.response?.data.message);
      setStep(withdrawalSteps.ERROR);

      if (errorType === withdrawalError.PIN) {
        setStep(withdrawalSteps.WITHDRAWAL_PIN);
        setError(withdrawalError.PIN);

        return;
      }
      if (errorType === withdrawalError.UNKNOWN) {
        setStep(withdrawalSteps.ERROR);
        setError(response?.response?.data.message);

        return;
      }
    },
  });

  function close(isOpen: boolean) {
    setForm({});
    setOpen?.(isOpen);
    setError(undefined);
    if (setPinStep) {
      setStep(withdrawalSteps.WITHDRAWAL_PIN);
    } else {
      setStep(withdrawalSteps.WITHDRAWAL_REQUEST);
    }
  }

  const withdrawalRequestData = {
    goal: goalData?.account?.goal_id,
    group: goalData?.account?.group_id,
    amount: goalData?.nature === 'Default' ? goalData?.account?.totalSavings : form.amount,
    reason: form?.reason,
    receiver: goalData?.creator_id,
  };

  const splitAndShareWithdrawalData = {
    goalId: goalData?.account?.goal_id,
    pin: form.pin,
  };

  const generalWithdrawalData = {
    pin: form.pin,
    requestId: requestData?._id,
  };

  function resolveActionButtonName(step: withdrawalSteps) {
    if (step === withdrawalSteps.WITHDRAWAL_REQUEST) {
      return 'Proceed';
    }
    if (step === withdrawalSteps.WITHDRAWAL_DETAILS) {
      return 'Request Withdrawal';
    }
    return 'continue';
  }

  function resolveActionHeadingName(step: withdrawalSteps) {
    if (step === withdrawalSteps.WITHDRAWAL_DETAILS) {
      return 'Withdrawal';
    }
    if (step === withdrawalSteps.WITHDRAWAL_PIN) {
      return 'Your Bezo Pin';
    }
    return 'Request Withdrawal';
  }

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
        closeVariant="primary"
        title="Processing"
        message={`Your withdrawal has been initiated successfully`}
      />
      <ActionModal
        open={open}
        setOpen={close}
        heading={resolveActionHeadingName(step)}
        hideCancel={[
          withdrawalSteps.WITHDRAWAL_REQUEST,
          withdrawalSteps.WITHDRAWAL_PIN,
          withdrawalSteps.ERROR,
          withdrawalSteps.LOADING,
        ].includes(step)}
        showGoBack={[withdrawalSteps.WITHDRAWAL_PIN, withdrawalSteps.WITHDRAWAL_DETAILS].includes(step)}
        hideContinue={[withdrawalSteps.LOADING, withdrawalSteps.ERROR].includes(step)}
        action={resolveActionButtonName(step)}
        goBackButtonProps={{
          onClick: () => {
            setStep(withdrawalSteps.WITHDRAWAL_REQUEST);
          },
        }}
        actionButtonProps={{
          onClick: () => {
            if (step === withdrawalSteps.WITHDRAWAL_REQUEST) {
              if (goalData?.nature === 'SplitAndShare') {
                setStep(withdrawalSteps.WITHDRAWAL_PIN);
              } else {
                setStep(withdrawalSteps.WITHDRAWAL_DETAILS);
              }
            }
            if (step === withdrawalSteps.WITHDRAWAL_DETAILS) {
              makeWithdrawalRequest(withdrawalRequestData);
            }
            if (step === withdrawalSteps.WITHDRAWAL_PIN) {
              {
                setPinStep
                  ? makeWithdrawal(generalWithdrawalData)
                  : withdrawFromSplitAndShare(splitAndShareWithdrawalData);
              }

              setStep(withdrawalSteps.LOADING);
            }
          },
          disabled: (() => {
            if (step === withdrawalSteps.WITHDRAWAL_DETAILS) {
              if (goalData?.nature === 'Default' || goalData?.nature === 'Emergency') {
                return !form?.reason;
              }

              return !form?.amount;
            }
            if (step === withdrawalSteps.WITHDRAWAL_PIN) {
              return !form.pin;
            }
          })(),
          loading: isMakingWithdrawalRequest || isWithdrawingFromSplitAndShare || isMakingWithdrawal,
        }}
      >
        <WithdrawalContext.Provider value={{ form, setForm, step, setStep, error, setError, setOpen, setPinStep }}>
          <WithdrawPin />
          <WithdrawLoading />
          <WithdrawalRequest goalData={goalData} />
          <WithdrawalError goalNature={goalData?.nature} message={error} />
          <WithdrawalDetails goalNature={goalData?.nature} />
        </WithdrawalContext.Provider>
      </ActionModal>
    </>
  );
};
