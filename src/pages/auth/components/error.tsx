import { CheckCircle, WarningCircle } from '@/components/icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

// parseError for Validations

export function parseErrorsToMap(errors: { inner: yup.ValidationError[] }) {
  let errorsMap: any = {};

  errors.inner.forEach((validationError: yup.ValidationError) => {
    errorsMap[validationError.path!] = validationError.message;
  });

  if (errors?.inner.length === 0) {
    return undefined;
  }

  return errorsMap;
}

// resolveMessage for server Errors

export function resolveErrorMessage(error: any) {
  if (error?.message === 'account_already_exist' || error?.message === 'phone_already_exist') {
    return {
      title: 'Account already exists',
      description: (
        <>
          We found another account with this phone number. Do you want to{' '}
          <Link to={'/auth/login'} className="underline font-bold">
            login
          </Link>{' '}
          instead?
        </>
      ),
    };
  }

  if (error?.message === 'phone_does_not_exist') {
    return {
      title: 'Account does not exist.',
      description: (
        <>
          {/* Do you want to{' '}
          <Link to={'/auth/register'} className="underline font-bold">
            Register
          </Link>{' '}
          an account instead? */}
          Download the mobile app to register an account
        </>
      ),
    };
  }

  if (error?.message === 'missing_identity') {
    return {
      title: 'Heya! We’re sorry but your account does not exist.',
      description: (
        <>
          No need to worry, just sign up{' '}
          <Link to={'/auth/register'} className="underline font-bold">
            here
          </Link>{' '}
          and join the growing community today!
        </>
      ),
    };
  }

  if (
    error?.message === 'Oops. Incorrect code. Check again ' ||
    error?.message === 'Oops! verifcation code is invalid'
  ) {
    return {
      title: 'Oops! It looks like the code is wrong. ',
      description: 'You might want to check and enter the code again',
    };
  }

  if (error?.message === '"otpNumber" is not allowed to be empty') {
    return {
      title: 'Otp Input is not allowed to be empty',
      description: 'Please ensure you have inputed the code sent to you before you proceed',
    };
  }

  if (error?.message === 'Invalid Mobile Money Number') {
    return {
      title: 'Your phone number is invalid',
      description: 'Please ensure that your phone number is a valid working phone number.',
    };
  }

  if (error?.message === 'otpNumber length must be at least 6 characters long') {
    return {
      title: ' The code length must be at least 6 characters long',
      description: ' Please refer to the code that was sent to you and make sure you are typing the correct value',
    };
  }

  if (error?.message === 'wrong_credentials') {
    return {
      title: 'Oops. Incorrect Password',
      description: 'Looks like you don’t have the keys. Try again with the right keys',
    };
  }
  if (error?.message === 'You entered a wrong pin') {
    return {
      title: 'Sorry, the Pin you entered is incorrect',
    };
  }

  if (error?.message === 'Upgrade your account to add a next of kin') {
    return {
      title: 'Failed',
      description: 'Upgrade your account to add a next of kin',
    };
  }

  if (error?.message === 'invalid_otp') {
    return {
      title: 'Verification error',
      description: 'Invalid Otp provided',
    };
  }
  return {
    title: 'An error occurred.',
    description: error?.message,
  };
}

export interface ErrorMessageProps {
  title?: string;
  description?: React.ReactNode;
  className?: string;
  loginEmoji?: boolean;
  emoji?: string;
  couponError?: boolean;
  variant?: 'error' | 'success' | 'danger';
}

export const Message: React.FC<ErrorMessageProps> = ({
  title,
  description,
  children,
  className,
  emoji = '😥',
  variant = 'error',
}) => {
  return (
    <div
      className={classNames(
        ' rounded-xl  lg:p-4 p-2 flex justify-between items-start',
        {
          'border border-[#F3F2F8] bg-[#FDEBE0]': variant === 'error',
          'bg-[#E3FBE4]': variant === 'success',
          'border border-[#E07272] bg-[#E07272]': variant === 'danger',
        },
        className
      )}
    >
      <div className=" flex items-start space-x-3">
        <div
          className={classNames('rounded-2xl p-3 ', {
            'bg-[#F8DBCB]': variant === 'error',
            'bg-[#D8F4D9]': variant === 'success',
            'bg-[#E07272]': variant === 'danger',
          })}
        >
          {variant === 'error' ? <p className="text-2xl">{emoji}</p> : null}
          {variant === 'success' ? <CheckCircle /> : null}
          {variant === 'danger' ? <WarningCircle className="text-white" /> : null}
        </div>
        <div>
          <p className=" font-sans text-sm font-medium text-neutral-900 ">{title}</p>
          <p className=" text-neutral-400 text-sm font-sans-body">{description}</p>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
