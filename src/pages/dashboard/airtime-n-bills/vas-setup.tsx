import { useApi } from '@/helpers/api';
import { useUser } from '@/hooks/useUser';
import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { VasPin } from './vas-context/vas-pin';
import { VasError } from './vas-context/error';
import { VasSuccess } from './vas-context/success';
import { VasLoading } from './vas-context/loading';
import { NotificationLayout } from '../components';
import { VasSetupProps, VasSteps } from './lib/types';
import { VasContext } from './vas-context/vas-context';
import { VasDetails } from './vas-context/vas-details';
import { verifyUserPin } from '@/helpers/verify-user-pin';
import { ActionModal } from '@/components/modal/action-modal';

export const VasSetup: React.FC<VasSetupProps> = ({ open, onClose, selectedBiller }) => {
  const { fetchUserData } = useUser();
  const { userProfile } = useAuthStore();
  const [error, setError] = useState('');
  const [form, setForm] = useState<any>({});
  const [userPin, setUserPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [openPinModal, setOpenPinModal] = useState(false);
  const [step, setStep] = useState<VasSteps>(VasSteps.DETAILS);

  const { submit: initiateBuy } = useApi('/users/vas/buy', {
    onSuccess() {
      setStep(VasSteps.SUCCESS);
      setTimeout(() => {
        fetchUserData();
      }, 1000);
    },
    onError(error) {
      setStep(VasSteps.ERROR);
      setError(error.response?.data.message);
    },
  });

  function setValue(key: any, value: any) {
    setForm((prevForm: any) => {
      return {
        ...prevForm,
        [key]: value,
      };
    });
  }
  function onDetailsNextHandler() {
    onClose();
    setStep(VasSteps.PIN);
    setOpenPinModal(true);
  }

  function close() {
    setOpenPinModal(false);
    setForm({});
    setUserPin('');
  }

  function onClickHandler() {
    if (step === VasSteps.PIN) {
      setStep(VasSteps.LOADING);
      initiateTransaction();
      return;
    }
    if (step === VasSteps.SUCCESS) {
      close();
      return;
    }
    if (step === VasSteps.ERROR) {
      close();
      return;
    }
  }

  async function initiateTransaction() {
    try {
      const response = await verifyUserPin(userPin);
      const verificationId = response.data.verificationId;

      initiateBuy({
        verificationId,
        amount: form.amount,
        billerId: selectedBiller?.id,
        billerName: selectedBiller?.name,
        channel: 'web',
        data: {
          network: selectedBiller?.name,
          mobileNumber: form?.mobileNumber,
          ...form,
        },
      });
    } catch (error: any) {
      if (error?.response.data?.message) {
        setStep(VasSteps.PIN);
        setPinError(error?.response.data?.message);
        return;
      }

      setStep(VasSteps.ERROR);
    }
  }

  const userNetwork = userProfile?.paymentMethods?.find((method) => method.default)?.network;
  const isUserNetwork = selectedBiller?.name.toLowerCase() === userNetwork?.toLowerCase();

  useEffect(() => {
    if (!open) return;

    if (isUserNetwork) {
      setForm((prev: any) => {
        return { ...prev, mobileNumber: userProfile?.phone };
      });
    } else {
      setForm((prev: any) => {
        return { ...prev, mobileNumber: '' };
      });
    }
  }, [open]);

  // onClose of the modal enable a more smooth closing of the modal

  useEffect(() => {
    if (!openPinModal) {
      close();
      setTimeout(() => {
        setStep(VasSteps.DETAILS);
      }, 600);
    }
  }, [openPinModal]);

  const vasCtxValue = { step, setStep, selectedBiller, form, setValue, userPin };

  return (
    <VasContext.Provider value={vasCtxValue}>
      <NotificationLayout
        open={open}
        onClose={onClose}
        title="Pay for Value Added Service"
        showActionButtons
        buttonProps={{
          continueText: 'Continue',
          onNext: onDetailsNextHandler,
          hideCancel: true,
          disabledContinue: !form?.mobileNumber || !form?.amount,
        }}
      >
        <VasDetails />
      </NotificationLayout>

      <ActionModal
        heading="Bezo Pin"
        hideHeader={[VasSteps.LOADING, VasSteps.SUCCESS, VasSteps.ERROR].includes(step)}
        open={openPinModal}
        setOpen={setOpenPinModal}
        modalWidth="sm:min-w-[35rem]"
        hideCancel={[VasSteps.LOADING, VasSteps.SUCCESS, VasSteps.ERROR].includes(step)}
        hideContinue={step === VasSteps.LOADING}
        action={step === VasSteps.PIN ? 'Pay' : 'Done'}
        actionButtonProps={{
          onClick: onClickHandler,
          variant: VasSteps.SUCCESS ? 'secondary' : 'primary',
        }}
      >
        <VasPin setUserPin={setUserPin} pinError={pinError} />
        <VasLoading />
        <VasSuccess />
        <VasError message={error} />
      </ActionModal>
    </VasContext.Provider>
  );
};
