import { Loading } from './loading';
import { useEffect, useState } from 'react';
import { networkOptions } from '../lib/data';
import { Spacer } from '@/components/spacer';
import { useNavigate } from 'react-router-dom';
import { Select } from '@/components/input/select';
import checkBox from '@assets/images/checkbox.png';
import { useMessagesStore } from '@/store/messages';
import { OtpVerification } from '../otp-verification';
import { RequestMethod, useApi } from '@/helpers/api';
import { ComingSoon } from '@/components/coming-soon';
import { useQueryClient } from '@tanstack/react-query';
import DeletePaymentMethod from './delete-payment-method';
import { RadioInput } from '@/components/input/radio-input';
import { ActionModal } from '@/components/modal/action-modal';
import { getValidPhoneNumberFromMask } from '@/pages/auth/login/login';
import { PhoneNumberInput } from '@/components/input/phone-number-input';
import { AddPaymentMethodProps, paymentMethodForm, paymentMethodTypes } from '../../settings/lib/types';

enum ErrorTypes {
  PHONE_NUMBER = 'phoneNumber',
  NETWORK_ERROR = 'networkError',
  PIN = 'pin',
}

export const AddPaymentMethod: React.FC<AddPaymentMethodProps> = ({ open, setOpen, paymentOption }) => {
  const [otp, setOtp] = useState('');
  const queryClient = useQueryClient();
  const [openOtp, setOpenOtp] = useState(false);
  const { displayMessage } = useMessagesStore();
  const [verifyError, setVerifyError] = useState('');
  const [openDeletePaymentMethod, setOpenDeletePaymentMethod] = useState(false);
  const [error, setError] = useState<{ type?: ErrorTypes; message: string }>({
    message: '',
  });

  const [otpStatus, setOtpStatus] = useState<'sending' | 'failed' | 'success'>('sending');
  const [paymentMethodData, setPaymentMethodData] = useState<paymentMethodForm>({
    phoneNumber: '',
    network: undefined,
    default: false,
    type: paymentMethodTypes.MOMO,
  });

  const { submit: sendOtp, isLoading: isSendingOtp } = useApi('/otps', {
    onSuccess: () => {
      setOtpStatus('success');
    },
    onError: () => {
      setOtpStatus('failed');
    },
  });

  // const {
  //   submit: verifyOtp,
  //   error: verifyError,
  //   setError: setVerifyError,
  //   isLoading: isVerifyingOtp,
  // } = useApi('/otps/verify', {
  //   onSuccess() {
  //     verifyUserId();
  //     setOpenOtp(false);
  //   },
  // });

  const { submit: addPaymentMethod, isLoading: isAddingPaymentMethod } = useApi('/users/payment-methods', {
    onSuccess: () => {
      closePaymentTypeModal();

      displayMessage({
        title: 'Success',
        description: 'Successfully added payment method',
        variant: 'success',
      });
    },
    onError: (error) => {
      const phoneExistError =
        error?.response?.data?.message === 'phone_already_exist'
          ? `${getValidPhoneNumberFromMask(paymentMethodData.phoneNumber)} already exist`
          : null;

      if (error?.response?.data.message === 'invalid_otp') {
        setVerifyError('Invalid otp');
        setOpenOtp(true);
        return;
      }

      onError();
      displayMessage({
        title: 'Error',
        description: phoneExistError || 'Something went wrong, please try again later',
        variant: 'error',
      });
    },
  });

  const { submit: updatePaymentMethod, isLoading: isUpdatingPaymentMethod } = useApi(
    `/users/payment-methods/${paymentMethodData?.id}`,
    {
      onSuccess: () => {
        closePaymentTypeModal();

        displayMessage({
          title: 'Success',
          description: 'Successfully updated payment method',
          variant: 'success',
        });
      },
      onError: (error) => {
        if (error?.response?.data.message === 'invalid_otp') {
          setVerifyError('Invalid otp');
          setOpenOtp(true);
          return;
        }
        onError();
        displayMessage({
          title: 'Error',
          description: error?.response?.data.message || 'Something went wrong, please try again later',
          variant: 'error',
        });
      },
      method: RequestMethod.PUT,
    }
  );

  const { submit: deletePaymentMethod, isLoading: isDeletingPaymentMethod } = useApi(
    `/users/payment-methods/${paymentMethodData?.id}`,
    {
      onSuccess: () => {
        closePaymentTypeModal();

        displayMessage({
          title: 'Success',
          description: 'Successfully deleted payment method',
          variant: 'success',
        });
      },
      onError: (error) => {
        onError();
        displayMessage({
          title: 'Error',
          description: error.response?.data.message || 'Something went wrong, please try again later',
          variant: 'error',
        });
      },
      method: RequestMethod.DELETE,
    }
  );

  const paymentMethodPhone = getValidPhoneNumberFromMask(paymentMethodData?.phoneNumber);
  useEffect(() => {
    if (paymentOption) {
      //@ts-ignore
      setPaymentMethodData((data) => ({
        ...data,
        phoneNumber: paymentOption?.phoneNumber!,
        network: paymentOption?.network.toUpperCase(),
        default: paymentOption?.default!,
        id: paymentOption.id,
      }));
    }
  }, [paymentOption]);

  const setValue = (key: keyof paymentMethodForm, value: any) => {
    setPaymentMethodData((paymentMethodData) => ({
      ...paymentMethodData,
      [key]: value,
    }));
  };

  function onError() {
    setOpen(false);
    setPaymentMethodData({
      phoneNumber: '',
      type: paymentMethodTypes.MOMO,
      default: false,
      id: '',
    });
    setError({
      type: undefined,
      message: '',
    });
    setVerifyError('');
    setOtp('');
  }
  const closePaymentTypeModal = () => {
    setOpen(false);
    setPaymentMethodData({
      phoneNumber: '',
      type: paymentMethodTypes.MOMO,
      default: false,
      id: '',
    });
    setError({
      type: undefined,
      message: '',
    });
    setVerifyError('');
    setOtp('');
    queryClient.invalidateQueries(['payment-methods']);
  };

  const handleVerifyOtp = () => {
    verifyUserId();
    setOpenOtp(false);
  };

  function handleSendOtp() {
    sendOtp({
      phone: paymentMethodPhone,
      verificationType: 'payment_method',
    });
  }

  const onContinue = async () => {
    const trimmedValue = getValidPhoneNumberFromMask(paymentMethodData.phoneNumber);

    if (!paymentMethodData.network) {
      setError({ type: ErrorTypes.NETWORK_ERROR, message: 'Please select a network provider' });
      return;
    }

    if (!paymentMethodData.phoneNumber || trimmedValue?.length !== 12) {
      setError({ type: ErrorTypes.PHONE_NUMBER, message: 'Please provide a valid phone number' });
      return;
    }
    handleSendOtp();
    setOpenOtp(true);
    setOpen(false);
  };

  async function verifyUserId() {
    const operation = paymentMethodData.id ? updatePaymentMethod : addPaymentMethod;

    operation({
      phone_number: getValidPhoneNumberFromMask(paymentMethodData.phoneNumber),
      network: paymentMethodData?.network?.toLowerCase(),
      paymentType: 'mobile_money',
      default: paymentMethodData.default,
      otp,
    });
  }

  return (
    <>
      <ActionModal open={isAddingPaymentMethod} hideContinue hideCancel hideHeader>
        <Loading />
        {/* <PaymentMethodError message="" /> */}
      </ActionModal>

      <OtpVerification
        open={openOtp}
        setOpen={setOpenOtp}
        action="Confirm"
        error={verifyError}
        phone={getValidPhoneNumberFromMask(paymentMethodData.phoneNumber)}
        onClick={handleVerifyOtp}
        disabled={otp.length === 0}
        value={otp}
        otpStatus={otpStatus}
        onChange={(event) => {
          setOtp(event);
          setVerifyError('');
        }}
        loading={isAddingPaymentMethod || isUpdatingPaymentMethod}
      />

      {/* <ActionModal
        open={openPinModal}
        setOpen={setOpenPinModal}
        heading="BezoPin"
        showGoBack
        hideCancel
        modalWidth="lg:max-w-[31.25rem] w-[90vw]"
        actionButtonProps={{
          onClick: () => {
            verifyUserId();
          },
          loading,
        }}
        goBackButtonProps={{
          onClick: () => {
            setOpenPinModal(false);
            setOpen(true);
          },
        }}
      >
        <div className="px-8 flex flex-col">
          <p className="my-2 text-neutral-500 text-left">Please provide your BezoPin to add a payment method</p>

          <Spacer className="h-2" />

          <OtpInput
            numInputs={4}
            isInputSecure
            shouldAutoFocus={true}
            isInputNum={true}
            value={paymentMethodData.pin}
            className="w-14 h-14"
            inputStyle={classNames(
              'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
              {
                ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100':
                  error.type === ErrorTypes.PIN,
              }
            )}
            containerStyle={'flex lg:space-x-6 space-x-2'}
            onChange={(event: string) => {
              setPaymentMethodData((prevData) => ({ ...prevData, pin: event }));
              setError({ message: '' });
            }}
          />

          <div className="text-left">{<ErrorText>{pinError}</ErrorText>}</div>
        </div>

        <Spacer className="h-7" />

        <p className="text-sm font-sans px-8 text-left">
          If you've forgotten your BezoPIN, reset it on the{' '}
          <span className="font-sans text-primary-200">
            <button
              onClick={() => {
                navigate('/dashboard/settings?tab=3');
              }}
            >
              {' '}
              settings page
            </button>
          </span>
        </p>
      </ActionModal> */}

      <ActionModal
        heading={paymentOption ? 'Update Payment Method' : 'Add a payment method'}
        open={open}
        setOpen={() => closePaymentTypeModal()}
        className="rounded-2xl"
        action={paymentOption ? 'Update' : 'Add'}
        modalWidth="max-w-[46.3rem] sm:min-w-[40rem] min-w-[90vw]"
        showGoBack={!!paymentOption}
        goBackChildren={<span className="text-white">Delete</span>}
        goBackButtonProps={{
          onClick: () => {
            // setOpen(false);
            setOpenDeletePaymentMethod(true);
          },
          className: 'bg-[#FF5029] hover:bg-[#FF5029]',
        }}
        actionButtonProps={{
          onClick: () => {
            onContinue();
          },
          loading: paymentOption ? isUpdatingPaymentMethod : isAddingPaymentMethod,
        }}
      >
        <DeletePaymentMethod
          open={openDeletePaymentMethod}
          setOpen={setOpenDeletePaymentMethod}
          onClick={deletePaymentMethod}
          isLoading={isDeletingPaymentMethod}
          paymentOption={paymentOption}
        />
        <div className="px-7 py-3 border-b border-neutral-100 text-left">
          <h2 className=" font-sans font-medium text-lg text-neutral-400">Select a type of payment method</h2>
          <div className="h-[1px] bg-neutral-200 w-full"></div>

          <Spacer className=" h-4" />

          <div className="flex sm:flex-row flex-col w-full items-center sm:space-x-4 sm:space-y-0 space-y-3">
            <div className="sm:w-1/2 w-full">
              <RadioInput
                name="paymentType"
                id="mobile-money"
                text="Mobile money"
                defaultChecked={paymentMethodData.type === paymentMethodTypes.MOMO}
              />
            </div>

            <div className="py-[10px] px-3 bg-neutral-100 rounded-full sm:w-1/2 w-full justify-between items-center flex">
              <p className="font-sans-body text-neutral-900">Visa Card</p>

              <ComingSoon />
            </div>
          </div>

          <Spacer className=" h-8" />

          <>
            <h2 className=" font-sans font-medium text-lg text-neutral-400">Payment details</h2>

            <div className="h-[1px] bg-neutral-200 w-full"></div>

            <Spacer className=" h-4" />

            <div className="flex flex-col space-y-5">
              <Select
                id="mobile-network"
                label="Mobile network"
                options={networkOptions}
                error={error.type === ErrorTypes.NETWORK_ERROR ? error.message : ''}
                value={paymentMethodData.network}
                onChange={(event) => {
                  setValue('network', event.target.value);
                  setError({ message: '' });
                }}
              />

              <PhoneNumberInput
                label="Phone number"
                labelClassName="text-sm font-semibold"
                error={error.type === ErrorTypes.PHONE_NUMBER ? error.message : ''}
                flagClassName="top-[40px] left-7"
                value={paymentMethodData.phoneNumber}
                onChange={(event) => {
                  setValue('phoneNumber', event.target.value);
                  setError({ message: '' });
                }}
              />
            </div>
          </>

          <Spacer className="h-5" />

          <button
            onClick={() => {
              setPaymentMethodData((prevData) => ({ ...prevData, default: !prevData.default }));
            }}
            className="flex items-center space-x-2"
          >
            {paymentMethodData.default ? (
              <img src={checkBox} width={20} height={20} alt="check box" />
            ) : (
              <div className="border-2 h-5 w-5 border-black rounded-sm"></div>
            )}

            <span className="text-sm font-sans text-neutral-400">Set as default payment Method</span>
          </button>

          <Spacer className=" h-11" />
        </div>
      </ActionModal>
    </>
  );
};
