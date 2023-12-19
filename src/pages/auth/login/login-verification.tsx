import classnames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { useState, useEffect, useContext } from 'react';
import OtpInput from 'react-otp-input';
import { useAuthStore } from '@/store/auth';
import { getValidPhoneNumberFromMask } from './login';
import { AuthLayout } from '../components/auth-layout';
import { Message, resolveErrorMessage } from '../components/error';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import useInterval from '@/helpers/use-interval';
import { useMutation } from '@tanstack/react-query';
import { createPublicApi } from '@/helpers/create-api';
import { LoginContext, LoginSteps } from './login-context';
import { Spinner } from '@/components/spinner';

const RESEND_DELAY = 30;

const LoginVerification = () => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = useAuthStore();
  const { step, setStep } = useContext(LoginContext);
  const [verificationError, setVerificationError] = useState();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY);

  const { mutate: resendOtp, isLoading: isResendingOtp } = useMutation(
    () =>
      createPublicApi({
        url: '/otps',
        data: {
          phone: getValidPhoneNumberFromMask(phoneNumber),
          verificationType: 'reset_password',
        },
      }),
    {
      onSuccess: () => {
        setSecondsLeft(RESEND_DELAY);
      },
    }
  );

  const { mutate: verifyOtp, isLoading: resendingOtp } = useMutation(
    () =>
      createPublicApi({
        url: '/otps/verify',
        data: {
          otp,
          phone: getValidPhoneNumberFromMask(phoneNumber),
          verificationType: 'reset_password',
        },
      }),
    {
      onSuccess: () => {
        setSecondsLeft(RESEND_DELAY);
        setStep(LoginSteps.RESET);
      },
      onError: (err: any) => {
        setVerificationError(err?.response.data);
      },
    }
  );

  const navigate = useNavigate();

  const handleOtpChange = (event: string) => {
    setOtp(event);
    setVerificationError(undefined);
  };

  const onResend = () => {
    resendOtp();
  };

  const displaySeconds = secondsLeft > 9 ? secondsLeft : `0${secondsLeft}`;

  useInterval(
    () => {
      setSecondsLeft((currentSecondsLeft) => currentSecondsLeft - 1);
    },
    secondsLeft > 0 ? 1000 : null
  );

  const onVerifyOtp = () => {
    verifyOtp();
    // loginWithOtpAndPhoneNumber({
    //   phoneNumber: getValidPhoneNumberFromMask(phoneNumber),
    //   otpNumber: otp,
    // });
  };

  const errorMessage = resolveErrorMessage(verificationError);

  useEffect(() => {
    if (phoneNumber === '') {
      navigate('/auth/login');
    }
  }, []);

  useEffect(() => {
    if (verificationError !== '') {
      setOtp('');
    }
  }, [verificationError]);

  if (step !== LoginSteps.VERIFY) {
    return null;
  }

  return (
    <>
      <h1 className="mt-24 font-sans font-extrabold text-5.5 leading-14 text-neutral-500">
        Alright! Let’s make sure you are super legit.🕵🏽‍♂️
      </h1>
      <p className="mt-3.5 font-sans-body text-neutral-500 font-normal">
        A 6 - digit code has been sent to <span className="text-tertiary-200">{phoneNumber}</span>.Enter the code below
        to verify your number and access your account.
        <Link className="font-normal text-primary-200 underline ml-1" to="/auth/login">
          Edit phone number
        </Link>
      </p>

      <Spacer className="h-14" />

      {verificationError ? (
        <>
          <Message emoji="😥" title={errorMessage?.title} description={errorMessage?.description}>
            <button
              onClick={() => {
                setVerificationError(undefined);
                setOtp('');
              }}
            >
              <SvgCloseIcon />
            </button>
          </Message>

          <Spacer className=" h-10" />
        </>
      ) : null}

      <OtpInput
        value={otp}
        onChange={handleOtpChange}
        numInputs={6}
        shouldAutoFocus
        isInputNum
        className="w-14 h-14"
        inputStyle={classnames('otp-input border  font-sans-body w-14 h-14 rounded-xl', {
          'border-neutral-200 text-neutral-500 focus:border-primary-300': !verificationError,
          'text-secondary-100 border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100':
            verificationError,
        })}
        containerStyle="flex lg:space-x-6 space-x-1 justify-center"
      />
      <Spacer className="h-10" />

      <Button loading={resendingOtp} className=" w-full" disabled={otp.length < 6} onClick={onVerifyOtp}>
        Continue
      </Button>

      <p className="  max-w-121 mt-4 font-normal text-sm font-sans-body text-center mb-6 lg:mg-0">
        I didn’t receive a code.
        <button
          disabled={secondsLeft > 0}
          onClick={onResend}
          className={classnames('font-bold ml-1 text-tertiary-200', {
            'cursor-not-allowed opacity-50': secondsLeft > 0,
            underline: !isResendingOtp,
          })}
        >
          {secondsLeft > 0 ? (
            `Resend in 00:${displaySeconds}`
          ) : isResendingOtp ? (
            <div className="flex items-center space-x-1">
              <span>Sending</span>
              <Spinner className="w-3 h-3" />
            </div>
          ) : (
            `Resend`
          )}
        </button>
      </p>

      <Spacer className=" h-36" />
    </>
  );
};

export default LoginVerification;
