import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { WaveEmoji } from '@/components/icons';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import { LoginContext, LoginSteps } from './login-context';
import { Message, resolveErrorMessage } from '../components/error';
import { PhoneNumberInput } from '@/components/input/phone-number-input';
import { RequestMethod, useApi } from '@/helpers/api';
import Banner from '@/components/download/banner';

export function getValidPhoneNumberFromMask(maskedNumber?: string) {
  return maskedNumber?.split(' ').join('').split('(').join('').split(')').join('');
}

const Login = () => {
  const [error, setError] = useState<{ message: string }>();
  const [phoneError, setPhoneError] = useState('');
  const { step, setStep } = useContext(LoginContext);
  const { phoneNumber, setPhoneNumber } = useAuthStore();

  // const { submit: checkIfUserHasPassword, isLoading: isCheckingIfUserHasPassword } = useApi(
  //   `/user/password?phone=${validPhoneNumber}`,
  //   {
  //     onSuccess() {
  //       navigate('/auth/login/password');
  //     },
  //     async onError() {
  //        sendOtp();
  //       displayMessage({
  //         title: 'Failed',
  //         description: 'Please something went wrong. Try again later!',
  //         variant: 'error',
  //       });
  //     },
  //     method: RequestMethod.GET,
  //   }
  // );

  const { submit: checkIfPhoneNumberExist, isLoading: isCheckingIfPhoneExists } = useApi(
    `/verifyphone/${getValidPhoneNumberFromMask(phoneNumber)}`,
    {
      method: RequestMethod.GET,
      onSuccess: (response) => {
        if (response.data && !response.data.exist) {
          setError({ message: 'phone_does_not_exist' });
          return;
        }

        setStep(LoginSteps.PASSWORD);
      },
    }
  );

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedValue = phoneNumber.replace(/ /g, '');

    if (event.key !== 'Enter') {
      return;
    }

    if (trimmedValue.length !== 14) {
      setPhoneError('Please enter a valid phone number to continue (eg. (233) 27 000 0000)');
      return;
    }

    checkIfPhoneNumberExist();
  };

  const handleLoginClick = () => {
    const trimmedValue = phoneNumber.replace(/ /g, '');

    if (trimmedValue.length !== 14) {
      setPhoneError('Please enter a valid phone number to continue (eg. (233) 27 000 0000)');
      return;
    }

    checkIfPhoneNumberExist();
  };

  const errorMessage = resolveErrorMessage(error);

  if (step !== LoginSteps.PHONE) {
    return null;
  }

  return (
    <>
      <div className="overflow-y-auto px-1">
        <div className="ml-2 pl-2 mt-28 rounded-2xl bg-LavenderGray">
          <Banner />
        </div>

        <h1 className="mt-[20px] font-sans font-extrabold text-5.5 leading-14 text-neutral-500">
          Welcome back!
          <WaveEmoji className="ml-3 mb-3 inline" />
        </h1>

        <Spacer className=" h-3" />

        <p className=" font-sans-body text-neutral-500 font-normal">
          We missed you. It’s really nice to see you again! All the magic happens in your account. Ready to roll?
        </p>

        <Spacer className="h-8" />

        {error ? (
          <>
            <Message emoji="😥" title={errorMessage?.title} description={errorMessage?.description}>
              <button
                onClick={() => {
                  setError(undefined);
                  setPhoneNumber('');
                }}
              >
                <SvgCloseIcon />
              </button>
            </Message>

            <Spacer className=" h-8" />
          </>
        ) : null}

        <div className="w-full">
          <PhoneNumberInput
            error={phoneError}
            onChange={(event) => {
              setError(undefined);
              setPhoneNumber(event.target.value);
              setPhoneError('');
            }}
            onKeyPress={onEnterPress}
            value={phoneNumber}
          />
        </div>

        <Spacer className="h-8" />

        <Button isFullWidth variant="primary" loading={isCheckingIfPhoneExists} onClick={handleLoginClick}>
          Login
        </Button>

        <Spacer className=" h-6" />

        {/* <p className=" lg:text-left text-center font-normal text-sm font-sans-body lg:mb-0">
          Don’t have an account?{' '}
          <Link className="font-bold text-neutral-400 underline" to="/auth/register">
            Create an account
          </Link>
        </p> */}
      </div>

      <Spacer className=" h-10" />
    </>
  );
};

export default Login;
