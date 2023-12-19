import { useApi } from '@/helpers/api';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { P2pContext } from './p2p-context';
import { P2pPin } from './p2p-form/p2p-pin';
import { useUser } from '@/hooks/useUser';
import { CONST } from '../../tools/constants';
import { P2pReviews } from './p2p-form/p2p-review';
import { P2pDetails } from './p2p-form/p2p-details';
import { useMessagesStore } from '@/store/messages';
import { P2pErrorMessage } from './p2p-form/p2p-error';
import { SuccesModal } from '@/components/success-modal';
import { verifyUserPin } from '@/helpers/verify-user-pin';
import { useNotification } from '@/hooks/useNotifications';
import { ActionModal } from '@/components/modal/action-modal';
import { getPrimaryGoalTopupError } from '../../savings/helpers';
import { P2pError, P2pFormContext, P2pSetupProps, P2pSteps } from '../lib/types';

export const P2pSetup: React.FC<P2pSetupProps> = ({ open, setOpen }) => {
  const { userProfile, stats } = useAuthStore();
  const [error, setError] = useState<P2pError>();
  const { fetchUserData } = useUser();
  const { displayMessage } = useMessagesStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState<P2pFormContext>({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const { refetch: refetchNotifications } = useNotification();
  const [step, setStep] = useState<P2pSteps>(P2pSteps.FORM_DETAILS);

  const { submit: transferFunds } = useApi('/user/transfer', {
    onSuccess() {
      setOpen(false);
      setOpenSuccess(true);
      fetchUserData?.();
      refetchNotifications();
    },
    onError(error) {
      displayMessage({
        title: 'Failed',
        description: error?.response?.data?.message || 'Something went wrong, please try again later',
        variant: 'error',
      });
    },
  });

  async function initiateP2p() {
    setIsLoading(true);
    try {
      const response = await verifyUserPin(form.pin);
      transferFunds({
        transferAccountId: form.transferAccountId,
        amount: Number(form.amount),
        verificationId: response.data.verificationId,
        channel: CONST.CHANNEL,
        narration: `Transfer to ${form.username} from ${userProfile?.user?.userName}` || form.notes,
      });
      setIsLoading(false);
    } catch (error) {
      setStep(P2pSteps.PIN);
      setError(P2pError.PIN);
      setIsLoading(false);
    }
  }

  // const { mutate: transferFunds } = useMutation(
  //   () =>
  //     createPrivateApi({
  //       url: '/accounts/user/transfer',
  //       data: sendData,
  //     }),
  //   {
  //     onSuccess: () => {
  //       setOpen(false);
  //       setOpenSuccess(true);
  //       fetchData?.();
  //     },
  //     onError: () => {
  //       displayMessage({
  //         title: 'Failed',
  //         description: 'Something went wrong, please try again later',
  //         variant: 'error',
  //       });
  //     },
  //   }
  // );

  const primaryGoalBalance = Number(stats?.totalPrimaryBalance!).toFixed(2);

  const setValue = (key: keyof P2pFormContext, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  function onClose() {
    setOpen(false);
    setForm({});
    setError(undefined);
  }

  useEffect(() => {
    if (open) {
      setStep(P2pSteps.FORM_DETAILS);
    }
  }, [open]);

  return (
    <>
      <SuccesModal
        p2p
        open={openSuccess}
        setOpen={setOpenSuccess}
        closeButtonProps={{
          children: 'Done',
        }}
        title={'way to go!'}
        message={`You have successfully sent funds to @${form.username}`}
      />

      <ActionModal
        open={open}
        setOpen={onClose}
        modalWidth={
          step === P2pSteps.FORM_DETAILS
            ? 'sm:max-w-[43.75rem] sm:min-w-[30.2rem] min-w-[90vw]'
            : 'sm:max-w-[43.75rem] sm:min-w-[25.2rem] min-w-[90vw]'
        }
        action={step === P2pSteps.FORM_DETAILS ? 'Send' : 'Continue'}
        heading={(() => {
          if (step === P2pSteps.FORM_DETAILS) {
            return 'Send to a friend';
          }
          if (step === P2pSteps.REVIEW) {
            return 'Confirm details';
          }
          if (step === P2pSteps.PIN) {
            return 'Bezo Pin';
          }
        })()}
        goBackButtonProps={{
          onClick: () => {
            if (step === P2pSteps.REVIEW) {
              setStep(P2pSteps.FORM_DETAILS);
            }
            if (step === P2pSteps.PIN) {
              setStep(P2pSteps.REVIEW);
            }
          },
        }}
        showGoBack={[P2pSteps.REVIEW, P2pSteps.PIN].includes(step)}
        hideCancel
        hideContinue={step === P2pSteps.ERROR}
        actionButtonProps={{
          onClick: () => {
            if (step === P2pSteps.FORM_DETAILS) {
              setStep(P2pSteps.REVIEW);
            }
            if (step === P2pSteps.REVIEW) {
              setStep(P2pSteps.PIN);
            }
            if (step === P2pSteps.PIN) {
              initiateP2p();
            }
          },
          className: step === P2pSteps.FORM_DETAILS ? '' : 'px-3',
          loading: isLoading,
          disabled: (() => {
            if (step === P2pSteps.FORM_DETAILS) {
              return (
                !form.amount ||
                !!errorMessage ||
                !form.username ||
                userProfile?.user?.userName === form.username ||
                !!getPrimaryGoalTopupError(form.amount, parseFloat(primaryGoalBalance!), 'primary')
              );
            }
            if (step === P2pSteps.PIN) {
              return !form.pin;
            }
          })(),
        }}
      >
        <P2pContext.Provider
          value={{
            step,
            setStep,
            setOpen: onClose,
            form,
            setForm,
            setValue,
            error,
            setError,
            errorMessage,
            setErrorMessage,
          }}
        >
          <P2pDetails />
          <P2pPin />
          <P2pReviews />
          <P2pErrorMessage message={error} />
        </P2pContext.Provider>
      </ActionModal>
    </>
  );
};
