import { Button } from '@/components/button';
import SvgPassword from '@/components/icons/Password';
import { Input } from '@/components/input/input';
import { Spacer } from '@/components/spacer';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import classnames from 'classnames';
import SvgOpenPassword from '@/components/icons/OpenPassword';
import { useAuthStore } from '@/store/auth';
import { ProfileDetailContext, ProfileForm } from './personal-details-form/profile-context';
import { getValidPhoneNumberFromMask } from '../login/login';
import { resolveErrorMessage } from '../components/error';
import { useMessagesStore } from '@/store/messages';
import { createPublicApi } from '@/helpers/create-api';
import { useMutation } from '@tanstack/react-query';

const passwordValidationSchema = yup.object().shape({
  Password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{6,}$/,
      'Password should have a minimum of 6 characters including 1 number'
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
export const SetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { displayMessage } = useMessagesStore();
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const { referralCode, authenticateUser, phoneNumber } = useAuthStore();
  const { form, step, setValue } = useContext(ProfileDetailContext);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dateOfBirth = form.dateOfBirth ? new Date(form.dateOfBirth?.replace(/-/g, '/')).toISOString() : '';

  const userData = {
    firstName: form.firstName,
    lastName: form.lastName,
    phone_number: getValidPhoneNumberFromMask(phoneNumber),
    // phone_number: '233257102527',
    dateOfBirth,
    referralCode,
    gender: form.gender,
    email: form.email,
    password: form.password,
    occupation: form.occupation,
    bezoSource: form.social?.[0]?.toLowerCase(),
    streetAddress: form.homeAddress,
    digitalAddress: form.gpsAddress,
    country: 'Ghana',
    region: form.region,
  };

  const { mutate: registerUser, isLoading: isRegisteringUser } = useMutation(
    () =>
      createPublicApi({
        url: '/users/signup',
        data: userData,
      }),
    {
      onSuccess: (response) => {
        authenticateUser(response?.data?.token, response?.data?.refreshToken);
        navigate('/auth/success');
      },
      onError: (error) => {
        displayMessage({
          //@ts-ignore
          title: resolveErrorMessage(error?.response?.data).title,
          //@ts-ignore
          description: resolveErrorMessage(error?.response?.data).description!,
          variant: 'error',
        });
      },
    }
  );

  useEffect(() => {
    setValue('password', password);
  }, [password]);

  const onContinue = async () => {
    passwordValidationSchema
      .validate(
        { Password: password, confirmPassword: confirmPassword },
        {
          abortEarly: false,
        }
      )
      .then(() => {
        registerUser();
      })
      .catch((error) => {
        let errors = error.inner[0].errors[0];
        setPasswordError(errors);
      });
  };

  return (
    <div
      className={classnames('relative', {
        hidden: step !== 5,
        '': step === 5,
      })}
    >
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

      <Button className=" w-full" loading={isRegisteringUser} onClick={onContinue}>
        Continue
      </Button>

      <Spacer className=" lg:h-0 h-10" />
    </div>
  );
};
