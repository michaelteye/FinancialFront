import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import useInterval from '@/helpers/use-interval';
import { useAuthStore } from '@/store/auth';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth-layout';
import { getValidPhoneNumberFromMask } from '../login/login';
import { Message, resolveErrorMessage } from '../components/error';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import { useMutation } from '@tanstack/react-query';
import { createPublicApi } from '@/helpers/create-api';
import { Spinner } from '@/components/spinner';

const RESEND_DELAY = 30;

export const RegisterVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY);
  const { phoneNumber, setUserId } = useAuthStore();
  const [verificationError, setVerificationError] = useState<string>();

  const { mutate: resendOtp, isLoading: isResendingOtp } = useMutation(
    () =>
      createPublicApi({
        url: '/otps',
        data: { phone: getValidPhoneNumberFromMask(phoneNumber), verificationType: 'register_user' },
      }),
    {
      onSuccess: () => {
        setSecondsLeft(RESEND_DELAY);
      },
    }
  );

  const { mutate: verifyOtp, isLoading: isVerifying } = useMutation(
    () =>
      createPublicApi({
        url: '/otps/verify',
        data: { otp, phone: getValidPhoneNumberFromMask(phoneNumber), verificationType: 'register_user' },
      }),
    {
      onSuccess: (response) => {
        navigate('/auth/register/personal-details');
        setUserId(response?.data.data.userId);
      },
      onError: (error: any) => {
        setVerificationError(error?.response.data);
      },
    }
  );

  const displaySeconds = secondsLeft > 9 ? secondsLeft : `0${secondsLeft}`;

  useInterval(
    () => {
      setSecondsLeft((currentSecondsLeft) => currentSecondsLeft - 1);
    },
    secondsLeft > 0 ? 1000 : null
  );

  const errorMessage = resolveErrorMessage(verificationError);

  useEffect(() => {
    if (verificationError) {
      setOtp('');
    }
  }, [verificationError]);

  useEffect(() => {
    if (!phoneNumber) {
      navigate('/auth/register');
    }
  }, []);

  return (
    <AuthLayout>
      <h1 className="mt-24 font-sans font-extrabold text-5.5 leading-14 text-neutral-500">
        Alright! Let’s make sure you are legit.🕵🏽‍♂️
      </h1>
      <p className="mt-3.5 font-sans-body text-neutral-500 font-normal">
        A 6 - digit code has been sent to <span className="text-tertiary-200">{phoneNumber}</span>. Enter the code below
        to verify your number.
        <Link className="font-normal text-primary-200 underline ml-1" to="/auth/register">
          Edit phone number
        </Link>
      </p>

      <Spacer className="lg:h-14 h-10" />

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

          <Spacer className=" lg:h-10 h-8" />
        </>
      ) : null}

      <OtpInput
        value={otp}
        numInputs={6}
        shouldAutoFocus={true}
        isInputNum={true}
        className="w-14 h-14"
        onChange={(otp: string) => {
          setOtp(otp);
          setVerificationError('');
        }}
        inputStyle={classNames('otp-input border  font-sans-body lg:h-14 h-[47px] rounded-xl', {
          'text-secondary-100 border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100':
            verificationError,
        })}
        containerStyle={'flex lg:space-x-6 justify-center'}
      />
      <Spacer className="h-10" />

      <Button className=" w-full" loading={isVerifying} onClick={() => verifyOtp()}>
        Continue
      </Button>

      <Spacer className="h-10" />

      <p className="  max-w-121 font-normal text-sm font-sans-body text-center lg:mg-0">
        I didn’t receive a code.
        <button
          disabled={secondsLeft > 0}
          onClick={() => resendOtp()}
          className={classNames('font-bold ml-1 text-tertiary-200 underline', {
            'cursor-not-allowed opacity-50': secondsLeft > 0,
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
    </AuthLayout>
  );
};
