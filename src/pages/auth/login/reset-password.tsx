import { Button } from '@/components/button';
import SvgPassword from '@/components/icons/Password';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth-layout';
import * as yup from 'yup';
import classnames from 'classnames';
import SvgOpenPassword from '@/components/icons/OpenPassword';
import { useAuthStore } from '@/store/auth';
import { getValidPhoneNumberFromMask } from '../login/login';
import { resolveErrorMessage } from '../components/error';
import { useMessagesStore } from '@/store/messages';
import { createPublicApi } from '@/helpers/create-api';
import { useMutation } from '@tanstack/react-query';
import { showGetStarted } from '@/hooks/show-get-started';
import { LoginContext, LoginSteps } from './login-context';
import { AxiosError } from 'axios';

const passwordValidationSchema = yup.object().shape({
  Password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/,
      'Password should have a minimum of 8 characters including 1 number'
    ),
  confirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match'),
});

interface setPasswordIconProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const SetPasswordIcon: React.FC<setPasswordIconProps> = ({ open, setOpen }) => {
  return (
    <button
      className={classnames('absolute right-5 z-10', {
        'top-11': open,
        'top-10': !open,
      })}
      onClick={() => setOpen(!open)}
    >
      {open ? <SvgOpenPassword /> : <SvgPassword />}
    </button>
  );
};

// ********************** main component ************************ //
export const ResetPassword = () => {
  const navigate = useNavigate();
  const showGS = showGetStarted();
  const { step } = useContext(LoginContext);
  const [password, setPassword] = useState('');
  const { displayMessage } = useMessagesStore();
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { phoneNumber, authenticateUser } = useAuthStore();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassword, isLoading: isResettingPassword } = useMutation(
    () =>
      createPublicApi({
        url: '/users/reset-password',
        data: { phone: getValidPhoneNumberFromMask(phoneNumber), password },
      }),
    {
      onSuccess: (response) => {
        authenticateUser(response?.data?.token, response?.data?.refreshToken);
        navigate(showGS ? '/dashboard/welcome' : '/dashboard/home');
      },
      onError: (error: AxiosError) => {
        displayMessage({
          title: resolveErrorMessage(error).title,
          description: error?.response?.data?.message || resolveErrorMessage(error).description!,
          variant: 'error',
        });
      },
    }
  );

  const onContinue = async () => {
    passwordValidationSchema
      .validate(
        { Password: password, confirmPassword: confirmPassword },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        resetPassword();
      })
      .catch((error) => {
        let errors = error.inner[0].errors[0];
        setPasswordError(errors);
      });
  };

  if (step !== LoginSteps.RESET) {
    return null;
  }
  return (
    <>
      <h1 className="mt-28 font-sans font-extrabold text-4xl lg:text-5.5 leading-10 text-neutral-500">
        Secure your account
      </h1>

      <Spacer className=" h-3" />

      <p className=" font-sans-body text-neutral-500 font-normal">
        Secure your account from third party access by setting a password. Please use a password you can remember
      </p>

      {/* change the password icon when clicked, when the icon state is open, set the password type to text and when the password is close set it to type passsword */}

      <Spacer className=" h-8" />

      <div className=" flex flex-col  relative">
        <SetPasswordIcon open={showPassword} setOpen={setShowPassword} />

        <Input
          id="Password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          error={passwordError}
          onChange={(event) => {
            setPassword(event.target.value);
            setPasswordError('');
          }}
        />
      </div>

      <Spacer className=" h-6" />

      <div className=" flex flex-col space-y-1 relative">
        <SetPasswordIcon open={showConfirmPassword} setOpen={setShowConfirmPassword} />

        <Input
          id="confirmPassword"
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={(event) => {
            setConfirmPassword(event?.target.value);
            setPasswordError('');
          }}
          error={passwordError}
        />
      </div>

      <Spacer className=" h-12" />

      <Button className=" w-full" loading={isResettingPassword} onClick={onContinue}>
        Continue
      </Button>

      <Spacer className=" lg:h-0 h-10" />
    </>
  );
};
