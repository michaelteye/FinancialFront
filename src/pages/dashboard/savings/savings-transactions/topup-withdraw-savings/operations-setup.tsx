import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActionModal } from '@/components/modal/action-modal';

import '../../../../../styles/paystack.css';
import { Loading } from './loading';
import { useApi } from '@/helpers/api';
import { ConfirmPin } from './confirm-pin';
import useGoals from '@/hooks/fetch-goal';
import { useAuthStore } from '@/store/auth';
import { useUser } from '@/hooks/useUser';
import { OperationDetails } from './operation-details';
import { SavingsGoalList } from './savings-goal-list';
import { SuccesModal } from '@/components/success-modal';
import { OperationsContext } from './operations-context';
import { OperationsErrorMessage } from './operations-error';
import { verifyUserPin } from '@/helpers/verify-user-pin';
import {
  ActionTypes,
  OperationsError,
  OperationsForm,
  OperationsFormContext,
  OperationsSteps,
  SavingGoal,
} from '../../helpers/types';
import { Networks } from '@/store/types';
import { differenceInDays } from 'date-fns';
import { usePaystackPayment } from 'react-paystack';
import { RequestMethod } from '@/helpers/create-api';
import { useQueryClient } from '@tanstack/react-query';
import { CONST } from '@/pages/dashboard/tools/constants';
import { LockTypes } from '@/pages/dashboard/tools/types';
import { useNotification } from '@/hooks/useNotifications';
import { getGoBackName, getPrimaryGoalTopupError, resolveOperationsErrorType } from '../../helpers';
import { PaystackProps } from 'react-paystack/dist/types';

// let paystackConfig={
//   publicKey: 'pk_test_4024df81c1322e96b2e2e11fc049df325629ac43',
//   reference:'37fhg3TYhg',
//   amount: 100,
//   currency: 'GHS',
//   email: 'admin@bezomoney.com',
//   phone:'0556578844'
//   } as PaystackProps
export const SavingsOperations: React.FC<OperationsForm> = ({
  open,
  setOpen,
  savingGoals,
  selectedSavingGoal,
  streak,
  streakValues,
  newUserTopUp,
  action = ActionTypes.BEZOWALLETTOPUP,
}) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { refetchGoals } = useGoals();
  const { fetchUserData } = useUser();

  const [paystackConfig, setPayStackConfig] = useState<PaystackProps>({
    // publicKey: 'pk_live_22679f1e061872cbbad0f9f3592a3630dce6ff45',
    publicKey: '',
    // reference:'37fhg3TYhg',
    amount: 0,
    currency: 'GHS',
    email: '',
    phone: '',
  });

  const initializePayment = usePaystackPayment(paystackConfig);

  useEffect(() => {
    initializePayment(onSuccessPayStack, onClose);
  }, [paystackConfig]);

  const [withdrawSuccess] = useState(false);
  const [newTopUp, setNewTopUp] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<OperationsError>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { userProfile, stats, defaultPaymentMethod, setUpdateProfile } = useAuthStore();
  const [form, setForm] = useState<OperationsFormContext>({ amount: '', paymentType: 'momo' });
  const { data: notificationData, refetch: refetchNotifications } = useNotification();
  const [step, setStep] = useState<OperationsSteps>(
    stats?.totalDeposits === 0 ? OperationsSteps.FORM_DETAILS : OperationsSteps.SELECT_GOAL
  );
  const [selectedGoal, setSelectedGoal] = useState<SavingGoal | undefined>(selectedSavingGoal);
  const network = defaultPaymentMethod?.network;
  const noDeposit = stats?.totalDeposits! === 0;
  const primaryBalance = parseFloat(userProfile?.balance!);
  const lockedGoalLessThanAMonth = differenceInDays(new Date(), new Date(selectedGoal?.createdAt!)) < 30;
  const userFullName = userProfile?.user?.firstName + userProfile?.user?.lastName!;

  //const publicKey = 'pk_live_22679f1e061872cbbad0f9f3592a3630dce6ff45';

  function close(isOpen: boolean) {
    if (noDeposit && (action === ActionTypes.BEZOWALLETTOPUP || action === ActionTypes.TOPUP)) {
      setForm({ ...form, pin: '', amount: CONST.INIT_DEPOSIT });
    }
    setForm({ amount: '', paymentType: 'momo' });
    setNewTopUp(false);
    setError(undefined);
    setOpen?.(isOpen);
    setError(undefined);
    setErrorMessage('');
    // if (action !== 'bezoWalletTopup' && action !== 'bezoWalletWithdraw') {
    //   setSelectedGoal(undefined);
    // }

    setSelectedGoal(undefined);
  }

  // onClose of the withdraw modal enable a more smooth closing of the modal

  useEffect(() => {
    if (open) {
      setSelectedGoal(undefined);
    }
  }, [open]);

  function saveNowClose() {
    if (!noDeposit) {
      setForm({ amount: '' });
    }

    if (noDeposit && (action === ActionTypes.BEZOWALLETTOPUP || action === ActionTypes.TOPUP)) {
      setForm({ ...form, pin: '' });
    }
    setNewTopUp(false);
    setError(undefined);
    setError(undefined);
    setErrorMessage('');
    if (action !== ActionTypes.BEZOWALLETTOPUP && action !== ActionTypes.BEZOWALLETWITHDRAW) {
      setSelectedGoal(undefined);
    }
  }

  function getActionMessage(
    action: ActionTypes,
    network: Networks,
    depositMethod?: 'primary' | 'momo' | 'visa',
    newSuccessDeposit?: boolean
  ) {
    if (depositMethod === 'visa') {
      return (
        <span className="flex flex-col items-center space-y-4">
          <span>You are being redirected to confirm the transaction</span>
        </span>
      );
    }

    if (action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP) {
      if (newSuccessDeposit) {
        return (
          <span className="flex flex-col items-center space-y-4">
            {' '}
            <span>Transaction successful!</span>
            <span>It’s time to save for your goals.</span>
          </span>
        );
      }

      if (depositMethod === 'momo' && network === Networks.MTN) {
        return (
          <span>
            If you don&lsquo;t get the prompt after 20 seconds, kindly dial *170# &lt;&lt; My Wallet &gt;&gt; My
            Approvals and approve payment
          </span>
        );
      }

      if (depositMethod === 'primary') {
        return `Your payment of GHS ${form?.amount} was successfully processed.`;
      }

      return 'Your deposit is currently being processed.';
    }

    if (depositMethod === 'primary') {
      return `GHS ${form?.amount} has been successfully transferred to your BezoWallet`;
    }

    if (withdrawSuccess) {
      return 'Your withdrawal is successfull.';
    }

    return 'Your withdrawal is currently processing.';
  }

  // const onClosePayStack = () => {
  //   updatingPaystackTransactionStatus({
  //     status: false,
  //     message: 'failed',
  //     data: {
  //       reference: paystackConfig.reference,
  //       status: 'failed',
  //       gateway_response: 'failed',
  //     },
  //     reference: paystackConfig.reference,
  //   });
  // };

  function onSuccess() {
    setOpen?.(false);
    setShowSuccess(true);
    queryClient.invalidateQueries(['saving-goals-details', params.savingsId]);
  }
  function onError(error: any) {
    const errorType = resolveOperationsErrorType(error?.response?.data?.message);

    if (errorType === OperationsError.PIN) {
      setStep(OperationsSteps.PIN);
      setError(OperationsError.PIN);

      return;
    }

    if (errorType === OperationsError.UNKNOWN) {
      const errMessage = error?.response.data.message;
      setStep(OperationsSteps.ERROR);

      setError(errMessage);
      return;
    }
  }

  const onSuccessPayStack = () => {
    close(false);
    fetchUserData();

    updatingPaystackTransactionStatus({
      status: true,
      message: 'success',
      data: {
        reference: paystackConfig.reference,
        status: 'success',
        gateway_response: 'success',
      },
      reference: paystackConfig.reference,
    });

    fetchUserData();
  };

  const { submit: updatingPaystackTransactionStatus } = useApi('/transactions/deposit/paystack/verify', {});

  const { submit: bezoWalletIntraTransfer } = useApi('/user/intratransfer', {
    onSuccess() {
      onSuccess();
      refetchGoals();
      fetchUserData();
      refetchNotifications();
    },
    onError(error) {
      onError(error);
    },
  });

  const { submit: depositFunds } = useApi('/transactions/deposit', {
    onSuccess(response) {
      const paystackAuthURL = response?.data?.extra?.authorization_url;
      console.log('the deposit Transaction passes >>>>', depositFunds);
      onSuccess();
      if (paystackAuthURL) {
        window.open(paystackAuthURL);
      }
    },
    onError(error) {
      onError(error);
    },
  });

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    close(false);
  };

  // const { submit: depositPaystackFunds } = useApi('/transactions/deposit/paystack', {
  //   onSuccess(response) {
  //     if (form.paymentType === 'momo') {
  //       setPayStackConfig((prev) => ({
  //         ...prev,
  //         reference: response.data.transactionId,
  //         amount: Number(response.data.amount) * 100,
  //         email: userProfile?.email || userFullName + '@pay.com',
  //         channels: ['mobile_money'],
  //         firstname: userProfile?.user?.firstName,
  //         lastname: userProfile?.user?.lastName,
  //         phone: response.data.senderPhone,
  //       }));
  //     } else {
  //       setPayStackConfig((prev) => ({
  //         ...prev,
  //         reference: response.data.transactionId,
  //         amount: Number(response.data.amount) * 100,
  //         email: 'admin@bezosusu.com',
  //         channels: ['card'],
  //         firstname: userProfile?.user?.firstName,
  //         lastname: userProfile?.user?.lastName,
  //         phone: response.data.senederPhone,
  //       }));
  //     }
  //   },
  //   onError(error) {
  //     onError(error);
  //   },
  // });

  const { submit: withdrawFunds } = useApi('/transactions/withdrawal', {
    onSuccess() {
      onSuccess();
      refetchNotifications();
      setTimeout(() => {
        fetchUserData();
      }, 1000);
    },
    onError(error) {
      onError(error);
    },
  });

  async function initiateTransaction() {
    if (form.paymentType === 'primary' && action === ActionTypes.TOPUP) {
      bezoWalletIntraTransfer({
        fromAccountId: userProfile?.account?.id,
        toAccountId: selectedGoal?.accountId,
        amount: Number(form.amount),
        narration: `Transfer to ${selectedGoal?.name} goal`,
      });

      return;
    }
    if (form.paymentType === 'primary' && action === ActionTypes.WITHDRAW) {
      bezoWalletIntraTransfer({
        toAccountId: userProfile?.account?.id,
        fromAccountId: selectedGoal?.accountId,
        amount: Number(form.amount),
        narration: `Transfer from ${selectedGoal?.name} goal to BezoWallet`,
      });
      return;
    }

    try {
      const response = await verifyUserPin(form.pin);
      const verificationId = response.data.verificationId;

      if (
        (action === ActionTypes.BEZOWALLETWITHDRAW || action === ActionTypes.WITHDRAW) &&
        userProfile?.phone === '233553030155'
      ) {
        setStep(OperationsSteps.ERROR);
        return;
      }

      // const operation =
      // action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? depositPaystackFunds : withdrawFunds;

      const operation =
        action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? depositFunds : withdrawFunds;

      if (form.paymentType === 'visa') {
        depositFunds({
          email: userProfile.emailIdentity?.email ? userProfile.emailIdentity?.email : 'admin@bezosusu.com',
          phoneNumber: userProfile.phone,
          reference: '' + Math.floor(Math.random() * 1000000000 + 1),
          narration: 'Deposit with paystack',
          amount: Number(form.amount),
          verificationId,
          channel: CONST.CHANNEL,
          paymentVendor: 'PAYSTACK',
          callbackUrl: 'https://app.bezosusu.com/dashboard/wallet',
        });
      }

      if (streak) {
        fixStreakDeposit({
          amount: Number(form.amount),
          pin: form.pin,
          depositFrom: form.paymentType,
          phoneNumber: userProfile?.phone,
          accountId: selectedGoal?.accountId,
          createdAt: form.streakDay,
          channel: CONST.CHANNEL,
          verificationId,
        });
        setStep(OperationsSteps.LOADING);
        return;
      }

      if (selectedGoal) {
        operation({
          amount: Number(form?.amount!),
          accountId: selectedGoal?.accountId,
          channel: CONST.CHANNEL,
          verificationId,
          network,
        });
      } else {
        operation({
          amount: Number(form?.amount!),
          verificationId,
          network,
          channel: CONST.CHANNEL,
        });
      }
    } catch (error) {
      setStep(OperationsSteps.PIN);
      setError(OperationsError.PIN);
    }
  }

  const { submit: updateStreakValue } = useApi(`users/streak/update/${userProfile?.user?.id}`, {
    method: RequestMethod.PATCH,
  });

  const { submit: fixStreakDeposit } = useApi('users/streak', {
    onSuccess() {
      setOpen?.(false);
      setShowSuccess(true);
      setTimeout(() => {
        updateStreakValue();
      }, 10000);

      queryClient.invalidateQueries(['streak']);
    },
    onError(error) {
      setStep(OperationsSteps.ERROR);
      setError(error?.response?.data?.message);
      return;
    },
  });

  useEffect(() => {
    if (open) {
      if (action !== ActionTypes.BEZOWALLETTOPUP) {
        setStep(OperationsSteps.SELECT_GOAL);
      }
      if (action === ActionTypes.BEZOWALLETTOPUP || (action === ActionTypes.TOPUP && !streak && noDeposit)) {
        setStep(OperationsSteps.FORM_DETAILS);
        // setForm({ ...form, paymentType: 'mtn' });
      }
      // if (action === 'topup' && !homePage) {
      //   setForm({ ...form, paymentType: 'primary' });
      // }
      if (action === ActionTypes.BEZOWALLETWITHDRAW) {
        setStep(OperationsSteps.FORM_DETAILS);
      }
    }
  }, [open]);

  useEffect(() => {
    if (noDeposit && (action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP)) {
      setForm({ ...form, paymentType: 'momo', amount: CONST.INIT_DEPOSIT });
      setStep(OperationsSteps.FORM_DETAILS);
    }
  }, [stats]);

  const latestNotification =
    useMemo(() => notificationData?.pages[0]?.data?.notifications[0], [notificationData]) || [];

  useEffect(() => {
    const title = latestNotification?.title?.toLowerCase();

    if (title?.includes('deposit') && !latestNotification?.[0]?.isRead) {
      // fetchUserData?.();
      if (open === false && showSuccess === false) {
        setNewTopUp(false);
      } else {
        setNewTopUp(true);
      }
    }
  }, [latestNotification]);

  return (
    <>
      <SuccesModal
        open={showSuccess}
        setOpen={setShowSuccess}
        hideActionButton={!newTopUp}
        actionButtonProps={{
          children: 'Save now',
          onClick: () => {
            setOpen?.(true);
            saveNowClose();
          },
        }}
        closeButtonProps={{
          onClick() {
            if (form.paymentType === 'visa') {
              fetchUserData();
            }
            close(false);
            setForm({ paymentType: 'momo', pin: '', amount: '' });
            setShowSuccess(false);
          },
          children: form.paymentType === 'visa' ? 'Done' : 'Close',
        }}
        title={newTopUp || withdrawSuccess ? 'SUCCESS!!!' : form?.paymentType === 'primary' ? 'Hurray!' : 'Processing'}
        //@ts-ignore
        message={getActionMessage(action, network, form.paymentType, newTopUp, open)}
      />
      <ActionModal
        className="max-h-[62.5rem] mt-0"
        modalWidth={
          [OperationsSteps.FORM_DETAILS, OperationsSteps.LOADING, OperationsSteps.ERROR].includes(step)
            ? 'sm:w-[43rem]'
            : 'sm:max-w-[35rem] w-[90vw]'
        }
        heading={
          step === OperationsSteps.SELECT_GOAL
            ? 'Select Savings Goal'
            : streak && savingGoals?.length! > 1
            ? selectedGoal
              ? `Fix Streak/${selectedGoal.name === 'Primary' ? 'BezoWallet' : selectedGoal.name}`
              : 'Fix Streak'
            : `${action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP ? 'Topup' : 'Withdraw from'} ${
                !selectedGoal ? 'your BezoWallet' : `${selectedGoal?.name} savings account`
              }`
        }
        spacerClass={classNames({
          'h-2': action === ActionTypes.WITHDRAW || action === ActionTypes.BEZOWALLETWITHDRAW,
        })}
        goBackActionName={getGoBackName(params, step)}
        hideCancel={[
          OperationsSteps.PIN,
          OperationsSteps.FORM_DETAILS,
          OperationsSteps.LOADING,
          OperationsSteps.ERROR,
        ].includes(step)}
        showGoBack={
          [OperationsSteps.PIN, OperationsSteps.FORM_DETAILS].includes(step) &&
          savingGoals?.length! > 1 &&
          step === OperationsSteps.FORM_DETAILS &&
          !noDeposit
        }
        open={open}
        hideContinue={[OperationsSteps.ERROR].includes(step)}
        hideHeader={[OperationsSteps.LOADING, OperationsSteps.ERROR].includes(step)}
        action="Continue"
        setOpen={(isOpen) => {
          if (OperationsSteps.LOADING === step) {
            return;
          }

          close(isOpen);
        }}
        goBackButtonProps={{
          onClick: () => {
            if (step === OperationsSteps.PIN) {
              setStep(OperationsSteps.FORM_DETAILS);
            }

            if (step === OperationsSteps.FORM_DETAILS) {
              setStep(OperationsSteps.SELECT_GOAL);
            }
          },
        }}
        actionButtonProps={{
          onClick: () => {
            if (step === OperationsSteps.SELECT_GOAL) {
              setStep(OperationsSteps.FORM_DETAILS);
            }

            if (step === OperationsSteps.FORM_DETAILS) {
              const amount = parseFloat(form.amount!);

              if (form.paymentType === 'primary') {
                initiateTransaction();
                setStep(OperationsSteps.LOADING);
                return;
              }

              if (isNaN(amount)) {
                setErrorMessage('Invalid Amount');
                return;
              }

              if (amount <= 0) {
                setError(OperationsError.AMOUNT);
                setErrorMessage(
                  action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP
                    ? 'Amount inputed is too low'
                    : 'Insufficient funds.'
                );
                return;
              }

              if (!errorMessage || errorMessage === '') {
                setStep(OperationsSteps.PIN);
              }
            }

            if (step === OperationsSteps.PIN) {
              initiateTransaction();
              setStep(OperationsSteps.LOADING);
              return form.pin;
            }
            console.log('the pin is given as >>>', form.pin);
          },
          disabled: (() => {
            if (OperationsSteps.PIN === step) {
              return !form.pin;
            }
            if (OperationsSteps.SELECT_GOAL === step) {
              if (streak) {
                return !form.streakDay || !selectedGoal;
              }
              return !selectedGoal;
            }

            if (OperationsSteps.FORM_DETAILS === step) {
              const primaryGoalTopUpError = getPrimaryGoalTopupError(
                form.amount!,
                primaryBalance!,
                form.paymentType!,
                action!
              );

              if (action === ActionTypes.TOPUP || action === ActionTypes.BEZOWALLETTOPUP) {
                return (
                  !form.amount ||
                  !!primaryGoalTopUpError ||
                  form.amount === '0' ||
                  !form.paymentType ||
                  !!errorMessage ||
                  (isNaN(primaryBalance!) && form.paymentType === 'primary')
                );
              }

              if (
                action === ActionTypes.WITHDRAW &&
                selectedGoal?.accountTypeName === LockTypes.BEZO_LOCK &&
                lockedGoalLessThanAMonth
              ) {
                return lockedGoalLessThanAMonth;
              }
              if (action === ActionTypes.WITHDRAW || action === ActionTypes.BEZOWALLETWITHDRAW) {
                return !form.amount || !!primaryGoalTopUpError || form.amount === '0' || !!errorMessage;
              }
            }

            if (OperationsSteps.LOADING === step) {
              return true;
            }

            return false;
          })(),
          loading: OperationsSteps.LOADING === step,
        }}
      >
        <Spacer className="h-5" />

        <OperationsContext.Provider
          value={{
            step,
            form,
            error,
            streak,
            setOpen: close,
            setError,
            setForm,
            setStep,
            action,
            newUserTopUp,
            errorMessage,
            setErrorMessage,
            savingGoals,
            selectedGoal,
            setSelectedGoal,
          }}
        >
          <SavingsGoalList streakValues={streakValues} />
          <OperationDetails />
          <ConfirmPin />
          <Loading />
          <OperationsErrorMessage message={error!} />
        </OperationsContext.Provider>
      </ActionModal>
    </>
  );
};
