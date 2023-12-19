import * as yup from 'yup';
import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { useApi } from '@/helpers/api';
import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/button';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import { useMessagesStore } from '@/store/messages';
import { BezoPinSuccess } from './bezo-pin-success';

const BezoPinValidationSchema = yup.object().shape({
  BezoPin: yup.string().required('This field is required'),
  confirmBezoPin: yup.string().oneOf([yup.ref('BezoPin'), null], 'Bezo PIN do not match please try again'),
});

export const BezoPin: React.FC<{ open: boolean; setOpen?: (open: boolean) => void }> = ({ open, setOpen }) => {
  const { userProfile } = useAuthStore();
  const [bezoPin, setBezoPin] = useState('');
  const [otpError, setOtpError] = useState('');
  const { displayMessage } = useMessagesStore();
  const [confirmOtp, setConfirmOtp] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const {
    submit: setPin,
    isLoading: isSettingPin,
    error: pinError,
  } = useApi('/users/pin', {
    onSuccess() {
      useAuthStore.setState({
        pinSet: true,
        userProfile: { ...userProfile, pinCreated: true },
      });

      setSuccessModalOpen(true);
      setOpen?.(false);
    },
    onError() {
      displayMessage({
        title: 'Failed',
        description: 'Something went wrong, Please try again later.',
        variant: 'error',
      });
    },
  });

  const onContinue = async () => {
    BezoPinValidationSchema.validate(
      { BezoPin: bezoPin, confirmBezoPin: confirmOtp },
      {
        abortEarly: false,
      }
    )
      .then(() => {
        setPin({
          userPin: bezoPin,
        });
      })
      .catch((error) => {
        let errors = error.inner[0].errors[0];
        setOtpError(errors);
      });
  };

  return (
    <>
      <BezoPinSuccess openSuccessPinModal={successModalOpen} setOpenSuccessPinModal={setSuccessModalOpen} />

      <Modal className="max-w-[30rem] rounded-2xl" open={open}>
        <div className="rounded-2xl flex flex-col w-full">
          <div className="rounded-t-2xl flex flex-col items-start bg-neutral-100 bg-opacity-60 py-4 px-7 relative">
            <div className="rounded-2xl">
              <p className=" font-sans font-semibold text-[#252525]">Bezo PIN</p>
            </div>
          </div>

          <Spacer className=" h-2" />

          <div className="border-b border-neutral-100 px-7">
            <div className=" text-left">
              <Spacer className="lg:h-6 h-4" />

              <p className="text-left font-sans text-xl text-neutral-400 ">Secure your account with your BezoPIN</p>

              <Spacer className="lg:h-2 h-1" />

              <p className="text-left text-[#FC6E1C] text-sm font-sans-body">
                Note: Please make sure it's a code you can remember easily since it will be used in all transactions
              </p>

              <Spacer className="lg:h-4 h-3" />

              <p className="text-xl text-neutral-400 font-sans text-center">Bezo PIN</p>

              <Spacer className="lg:h-4 h-3" />

              <div className=" flex flex-col items-center">
                <OtpInput
                  value={bezoPin}
                  numInputs={4}
                  isInputSecure
                  shouldAutoFocus={true}
                  isInputNum={true}
                  className="w-14 h-14"
                  inputStyle={classNames(
                    'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
                    {
                      ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100': otpError,
                    }
                  )}
                  containerStyle={'flex lg:space-x-6 space-x-2 justify-center'}
                  onChange={(event: string) => {
                    setBezoPin(event);
                    setOtpError('');
                  }}
                />

                <Spacer className="h-4" />

                <p className=" text-xl text-neutral-400 font-sans">Confirm Bezo PIN</p>

                <Spacer className="h-4" />

                <OtpInput
                  value={confirmOtp}
                  numInputs={4}
                  isInputSecure
                  isInputNum={true}
                  className="w-14 h-14"
                  inputStyle={classNames(
                    'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
                    {
                      ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100': otpError,
                    }
                  )}
                  containerStyle={'flex lg:space-x-6 space-x-2 justify-center'}
                  onChange={(event: string) => {
                    setConfirmOtp(event);
                    setOtpError('');
                  }}
                />

                {otpError ? (
                  <>
                    <Spacer className=" h-4" /> <p className="text-[#FF5029] font-sans-body">{otpError}</p>
                  </>
                ) : null}

                <Spacer className="lg:h-14 h-8" />
              </div>
            </div>
          </div>

          <Spacer className="lg:h-4 h-3" />

          <div className="flex justify-center">
            <div>
              <Button
                className=""
                loading={isSettingPin}
                disabled={bezoPin.length < 4 || confirmOtp.length < 4}
                variant="primary"
                onClick={() => {
                  onContinue();
                }}
              >
                Set Bezo PIN
              </Button>
            </div>
          </div>

          <Spacer className="lg:h-4 h-3" />
        </div>
      </Modal>
    </>
  );
};
