import { Button } from '@/components/button';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useAuthStore } from '@/store/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth-layout';
import { Message, resolveErrorMessage } from '../components/error';
import Login, { getValidPhoneNumberFromMask } from './login';
import { SetPasswordIcon } from '../register/set-password';
import { useMutation } from '@tanstack/react-query';
import { createPublicApi } from '@/helpers/create-api';
import { showGetStarted } from '@/hooks/show-get-started';
import { LoginContext, LoginSteps } from './login-context';
import Banner from '@/components/download/banner';

export const LoginPassword = () => {
  const navigate = useNavigate();
  const showGS = showGetStarted();
  const { step, setStep } = useContext(LoginContext);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { phoneNumber, authenticateUser } = useAuthStore();
  const [wrongPasswordError, setWrongPasswordError] = useState<{ message: string }>();

  const { mutate: sendResetPasswordOtp } = useMutation(() =>
    createPublicApi({
      url: '/otps',
      data: { phone: getValidPhoneNumberFromMask(phoneNumber), verificationType: 'reset_password' },
    })
  );

  const { mutate: loginUser, isLoading: isLoggingUser } = useMutation(
    () =>
      createPublicApi({
        url: '/users/login',
        data: { password, phone: getValidPhoneNumberFromMask(phoneNumber) },
      }),
    {
      onSuccess: (response) => {
        authenticateUser(response?.data?.token, response?.data?.refreshToken);
        navigate(showGS ? '/dashboard/welcome' : '/dashboard/home');
      },
      onError: (error: any) => {
        setWrongPasswordError(error?.response.data);
      },
    }
  );

  const handleForgotPassword = () => {
    setStep(LoginSteps.VERIFY);
    sendResetPasswordOtp();
  };

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    if (password.length < 8) {
      setPasswordError('Must be atleast 8 characters long');
      
    }

    loginUser();
  };

  const passwordSubmit = () => {
    if (password.length < 8) {
      setPasswordError('Must be atleast 8 characters long');
      console.log('this is the error from', password)

      return;
    }

    loginUser();
    // console.log("got it here")
    
    
  };

  // const errorMessage = resolveErrorMessage(wrongPasswordError);

  if (step !== LoginSteps.PASSWORD) {
    return null;
  }

  console.log(wrongPasswordError);

  return (
    <>
      <div className="ml-2 pl-2  mt-32 rounded-2xl bg-LavenderGray">
        {/* <div className=" px-5 py-5">
              <h1 className="leading-5 font-extrabold text-[23px] pb-1 font-opensans">
                  Download the new Bezo app now
              </h1>
              <h2 className=" font-opensans font-normal text-[15px] ">
                Unlock the Full Potential. Download Our App for an Enhanced User Experience! 
              </h2>
            </div> */}
        <Banner />
      </div>
      <h1 className="mt-[20px] font-sans font-extrabold text-5.5  leading-14 text-neutral-500">
        You’ve got the keys. Enter it 😀
      </h1>

      <Spacer className=" h-3" />

      <p className=" font-sans-body text-neutral-500 font-normal">
        The keys are yours and it’s time to get access to your treasure box.
      </p>

      <Spacer className=" h-8" />

      {wrongPasswordError ? (
        <>
          <Message
            emoji="😥"
            title={wrongPasswordError.message === 'wrong_credentials' ? 'Invalid Credentials' : 'Something went wrong.'}
            description={
              wrongPasswordError?.message === 'wrong_credentials'
                ? 'Please check the details provided and try again.'
                : wrongPasswordError?.message
            }
          >
            <button
              onClick={() => {
                setWrongPasswordError(undefined);
                setPassword('');
              }}
            >
              <SvgCloseIcon />
            </button>
          </Message>

          <Spacer className=" h-10" />
        </>
      ) : null}

      <div className=" flex flex-col relative">
        <SetPasswordIcon open={showPassword} setOpen={setShowPassword} />
        <Input
          id="Password"
          label=" Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => {
            setPassword(event.target.value);
            setWrongPasswordError(undefined);
            setPasswordError('');
          }}
          onKeyPress={onEnterPress}
          error={passwordError}
        />
      </div>

      <Spacer className=" h-4" />

      <div className="text-right">
        <button onClick={handleForgotPassword} className=" font-sans-body text-neutral-400 underline">
          I forgot my password
        </button>
      </div>

      <Spacer className=" h-12" />

      <Button
        disabled={password === '' ? true : false}
        className=" w-full"
        loading={isLoggingUser}
        onClick={passwordSubmit}
      >
        Continue
      </Button>

      <Spacer className=" h-36" />
    </>
  );
};
