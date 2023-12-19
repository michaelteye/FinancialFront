import * as yup from 'yup';
import { useState } from 'react';

import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';

import { useAuthStore } from '@/store/auth';
import { useMessagesStore } from '@/store/messages';
import { useMutation } from '@tanstack/react-query';
import { RequestMethod, useApi } from '@/helpers/api';
import { OtpVerification } from './otp-verification';
import { createPrivateApi } from '@/helpers/create-api';
import { ActionModal } from '@/components/modal/action-modal';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { SetPasswordIcon } from '@/pages/auth/register/set-password';
import { getValidPhoneNumberFromMask } from '@/pages/auth/login/login';

const reg = new RegExp('^[0-9]+$');

const bezoPinValidationSchema = yup.object().shape({
  newPin: yup
    .string()
    .required('This field is required')
    .matches(reg, 'The pin must be numbers')
    .length(4, 'The pin must be 4 characters long'),
  confirmNewPin: yup.string().oneOf([yup.ref('newPin'), null], 'The Pins must match'),
});

const passwordValidationSchema = yup.object().shape({
  currentPassword: yup.string().min(8, 'The password must be 8 characters long'),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/,
      'Password should have a minimum of 8 characters including 1 number'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'The Password must match'),
});

export const Security = () => {
  const [otp, setOtp] = useState('');
  const { userProfile } = useAuthStore();
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState('');
  const { displayMessage } = useMessagesStore();
  const [confirmPin, setConfirmPin] = useState('');
  const [passwordOtp, setPasswordOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pinChangeTime, setPinChangeTime] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [bezoPinOtpInputOpen, setBezoPinOtpInputOpen] = useState(false);
  const [passwordotpInputOpen, setPasswordOtpInputOpen] = useState(false);
  const [changeTransactionPin, setChangeTransactionPin] = useState(false);
  const [passwordInputCheckError, setPasswordInputCheckError] = useState<any>({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpStatus, setOtpStatus] = useState<'sending' | 'failed' | 'success'>('sending');

  const {
    submit: changePin,
    setError: setChangePinError,
    isLoading: isChangingBezoPin,
  } = useApi('/users/pin', {
    onSuccess() {
      displayMessage({
        title: 'Pin reset successfull',
        description: 'Your Bezo Pin has been successfully reset',
        variant: 'success',
      });
      resetForm();
      setChangeTransactionPin(false);
    },
    onError(error) {
      setChangePinError(error.response?.data.message);
      displayMessage({
        title: 'Failed',
        description: error?.response?.data.message || 'Something went wrong, please try again later.',
        variant: 'error',
      });
    },
    method: RequestMethod.PUT,
  });

  // const { submit: getPinData } = useApi('/user/pin/data', {
  //   method: RequestMethod.GET,
  //   onSuccess(response) {
  //     setPinChangeTime(response?.data?.data?.updatedAt);
  //   },
  // });

  // const BezoPinChangeTime = pinChangeTime ? format(new Date(pinChangeTime), 'eee, do MMMM yyy') : null;

  const { mutate: sendOtp, isLoading } = useMutation(
    () =>
      createPrivateApi({
        url: '/otps',
        data: {
          phone: getValidPhoneNumberFromMask(userProfile?.phone),
          verificationType: 'register_user',
        },
      }),
    {
      onSuccess: () => {
        setOtpStatus('success');
      },
      onError: () => {
        setOtpStatus('failed');
      },
    }
  );

  const handleChangePin = () => {
    changePin({
      userPin: newPin,
      otp,
    });
  };

  // Validation funciion

  const onBezoPinInputValidation = async () => {
    bezoPinValidationSchema
      .validate(
        {
          newPin,
          confirmNewPin: confirmPin,
        },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        {
          handleChangePin();
        }
      })
      .catch((error) => {
        let errors = error.inner[0].errors[0];
        setPinError(errors);
      });
  };

  //

  const {
    submit: verifyBezoPinOtp,
    error: verifyBezoPinError,
    setError: setVerifyBezoPinError,
    isLoading: isVerifyingOtp,
  } = useApi('/user/otp/verify', {
    onSuccess() {
      setBezoPinOtpInputOpen(false);
      setChangeTransactionPin(true);
    },
  });

  const resetForm = () => {
    setPinError('');
    setOtp('');
    setNewPin('');
    setConfirmPin('');
    setVerifyBezoPinError('');
  };

  //
  const closeChangePinModal = () => {
    setChangeTransactionPin(false);
    resetForm();
  };

  const setOtpOpen = () => {
    setBezoPinOtpInputOpen(true);
    setOtp('');
    setVerifyBezoPinError('');
    setChangePinError('');
  };

  // ***************************** PASSWORD SETTING ********************************* //

  const { submit: sendPasswordResetOtp, isLoading: isSendingPasswordResetOtp } = useApi('/otps', {
    onSuccess() {
      setOtpStatus('success');
    },
    onError() {
      setOtpStatus('failed');
    },
  });

  const { submit: changePassword, isLoading: isChangingPassword } = useApi('/users/change-password', {
    onSuccess() {
      displayMessage({
        title: 'Password reset successfull',
        description: 'Your Password has been successfully changed',
        variant: 'success',
      });
      setPasswordOtpInputOpen(false);
    },
    onError() {
      displayMessage({
        title: 'Failed.',
        description: 'Something went wrong, Please try again later.',
        variant: 'error',
      });
      setPasswordOtpInputOpen(false);
    },
  });

  const handleChangePassword = () => {
    changePassword({
      oldPassword: currentPassword,
      phone: userProfile?.phone,
      password: newPassword,
    });
  };

  const {
    submit: verifyPasswordOtp,
    error: verifyPasswordError,
    setError: setVerifypasswordError,
  } = useApi('/otps/verify', {
    onSuccess() {
      handleChangePassword();
    },
  });

  const passwordInputValidation = async () => {
    passwordValidationSchema
      .validate(
        {
          newPassword,
          confirmPassword,
          currentPassword,
        },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        sendPasswordResetOtp({
          phone: userProfile?.phone,
          verificationType: 'reset_password',
        });
        setPasswordOtpInputOpen(true);
        setVerifypasswordError('');
        setPasswordOtp('');
      })
      .catch((error) => {
        setPasswordInputCheckError(parseErrorsToMap(error));
      });
  };

  const handleVerifyOtp = () => {
    verifyPasswordOtp({
      phone: userProfile?.phone,
      otp: Number(passwordOtp),
      verificationType: 'reset_password',
    });
  };

  // useEffect(() => {
  //   getPinData();
  // }, []);

  return (
    <>
      {/*******************************  OTP VERIFICATION MODALS  ********************************/}

      <OtpVerification
        open={passwordotpInputOpen}
        setOpen={setPasswordOtpInputOpen}
        action="Change Password"
        phone={userProfile?.phone}
        error={verifyPasswordError}
        onClick={handleVerifyOtp}
        disabled={passwordOtp.length === 0}
        value={passwordOtp}
        otpStatus={otpStatus}
        onChange={(event) => {
          setPasswordOtp(event);
          setVerifypasswordError('');
        }}
        loading={isChangingPassword}
      />

      <OtpVerification
        open={bezoPinOtpInputOpen}
        setOpen={() => {
          resetForm();
          setBezoPinOtpInputOpen(false);
        }}
        phone={userProfile?.phone}
        otpStatus={otpStatus}
        disabled={otp.length < 6}
        onClick={() => {
          setChangeTransactionPin(true);
          setBezoPinOtpInputOpen(false);
        }}
        loading={isVerifyingOtp}
        value={otp}
        onChange={(event: any) => {
          setOtp(event);
          setVerifyBezoPinError('');
        }}
        error={verifyBezoPinError}
      />

      {/* // ************** CHANGE BEZO PIN MODAL ************** // */}

      <ActionModal
        heading="Edit Bezo Pin"
        open={changeTransactionPin}
        setOpen={closeChangePinModal}
        hideCancel
        showGoBack
        className="rounded-2xl"
        modalWidth="sm:max-w-[31.2rem] w-[90vw]"
        action="Continue"
        actionButtonProps={{
          onClick: () => {
            onBezoPinInputValidation();
          },
          disabled: newPin === '' || confirmPin === '' ? true : false,
          loading: isChangingBezoPin,
        }}
        goBackButtonProps={{
          onClick: () => {
            setChangeTransactionPin(false);
            setBezoPinOtpInputOpen(true);
          },
        }}
      >
        <div className=" flex flex-col text-left space-y-4 border-b border-neutral-100 p-7">
          <Input
            id="new Bezo Pin"
            type="password"
            label="New Bezo Pin"
            placeholder="New Bezo Pin"
            error={pinError}
            onChange={(event) => {
              setNewPin(event.target.value);
              setPinError('');
            }}
          />

          <Input
            type="password"
            id="confirm Bezo Pin"
            label="Confirm Bezo Pin"
            placeholder="Confirm Bezo Pin"
            error={pinError}
            onChange={(event) => {
              setConfirmPin(event.target.value);
              setPinError('');
            }}
          />

          <Spacer className="lg:h-20 h-10" />
        </div>
      </ActionModal>

      <Spacer className=" h-8" />

      {/*
       *******************************    CHANGE PASSWORD     *********************************
       */}

      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Change password</h2>

      <Spacer className=" h-7" />

      <div className=" flex w-full lg:w-1/3 relative">
        <SetPasswordIcon open={showCurrentPassword} setOpen={setShowCurrentPassword} />
        <Input
          id="current-password"
          label="Current password"
          type={showCurrentPassword ? 'text' : 'password'}
          error={passwordInputCheckError?.currentPassword}
          placeholder="Current password here.."
          onChange={(event) => {
            setCurrentPassword(event.target.value);
            setPasswordInputCheckError({
              ...passwordInputCheckError,
              currentPassword: undefined,
            });
          }}
        />
      </div>

      <Spacer className=" h-6" />

      <div className=" flex flex-col lg:flex-row lg:space-x-5">
        <div className="w-full lg:w-1/3 relative">
          <SetPasswordIcon open={showNewPassword} setOpen={setShowNewPassword} />

          <Input
            id="new-password"
            label="New password"
            type={showNewPassword ? 'text' : 'password'}
            error={passwordInputCheckError?.newPassword}
            placeholder="Type new password here.."
            onChange={(event) => {
              setNewPassword(event.target.value);
              setPasswordInputCheckError({
                ...passwordInputCheckError,
                newPassword: undefined,
              });
            }}
          />
        </div>

        <Spacer className="lg:hidden h-6" />

        <div className="w-full lg:w-1/3 relative">
          <SetPasswordIcon open={showConfirmPassword} setOpen={setShowConfirmPassword} />

          <Input
            id="confirm-new-password"
            label="Confirm new password"
            type={showConfirmPassword ? 'text' : 'password'}
            error={passwordInputCheckError?.confirmPassword}
            placeholder="Type new password here.."
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setPasswordInputCheckError({
                ...passwordInputCheckError,
                confirmPassword: undefined,
              });
            }}
          />
        </div>
      </div>

      <Spacer className=" h-8" />

      <div className="lg:w-1/3 w-full">
        <Button
          loading={isSendingPasswordResetOtp}
          disabled={currentPassword === '' || newPassword === '' || confirmPassword === ''}
          onClick={() => {
            passwordInputValidation();
          }}
          className=" px-8 py-4"
        >
          Change password
        </Button>
      </div>

      <Spacer className=" h-11" />

      <h2 className=" font-sans font-medium text-2xl text-neutral-400">Transaction BezoPin</h2>

      <Spacer className=" h-7" />

      <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-3 space-x-0 lg:space-x-5">
        <div>
          <Button
            className="w-full sm:w-auto px-4 py-3"
            variant="secondary"
            loading={isLoading}
            onClick={() => {
              setBezoPinOtpInputOpen(true);
              sendOtp();
            }}
          >
            Change transaction BezoPin
          </Button>
        </div>
        {/* <div>
          <Notice text={`Date of last transaction PIN reset : ${BezoPinChangeTime}`} />
        </div> */}
      </div>

      <Spacer className="sm:hidden h-24" />
      <Spacer className="sm:hidden h-10" />
    </>
  );
};
