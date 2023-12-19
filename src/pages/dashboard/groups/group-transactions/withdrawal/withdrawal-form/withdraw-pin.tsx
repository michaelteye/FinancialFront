import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { Spacer } from '@/components/spacer';
import { useWithdrawalContext } from '../withdrawal-context';
import { withdrawalError, withdrawalSteps } from '../../../lib/types';

export const WithdrawPin = () => {
  const { step, form, setForm, error, setError } = useWithdrawalContext();

  const hasError = error === withdrawalError.PIN;

  if (step !== withdrawalSteps.WITHDRAWAL_PIN) {
    return null;
  }

  return (
    <div className="w-full ">
      <p className="my-4 text-neutral-500 px-7">Please enter your BezoPin to proceed</p>

      <OtpInput
        value={form?.pin}
        numInputs={4}
        isInputSecure
        isInputNum={true}
        className="w-14 h-14"
        inputStyle={classNames(
          'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
          {
            ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100': hasError,
          }
        )}
        containerStyle={'flex lg:space-x-6 space-x-2 justify-center'}
        onChange={(pin: string) => {
          if (hasError) {
            setError?.(undefined);
          }
          setForm({ ...form, pin });
        }}
      />
      {hasError ? (
        <>
          <Spacer className="h-3" />
          <p className="text-secondary-200">Please provide a valid bezo pin</p>
        </>
      ) : null}

      <Spacer className="h-3" />

      <p className="font-sans-body text-sm text-neutral-400">
        If you’ve forgotten your BezoPIN your view or reset it on your
        <Link className="font-medium underline" to="/dashboard/settings?tab=3">
          {' '}
          settings
        </Link>
      </p>

      <Spacer className="h-12" />
    </div>
  );
};
