import { ActionModal } from '@/components/modal/action-modal';
import { Spacer } from '@/components/spacer';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import classNames from 'classnames';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import * as yup from 'yup';
import { parseErrorsToMap } from '@/pages/auth/components/error';

import { useNavigate } from 'react-router-dom';
import { useInvestContext } from '../invest-ctx';
import { InvestFormValues, InvestSteps } from '../types';

const UserPinSchema = yup.object().shape({
  userPin: yup.string().required('Pin is required'),
});

interface UserPinProps {
  openPinModal?: boolean;
  onSubmit?: () => void;
  error?: string;
  form?: InvestFormValues;
  submitting?: boolean;
  message?: string;
  onChange?: (pin: string) => void;
  setOpenPinModal: (open: boolean) => void;
  hideCancel?: boolean;
}

export const InvestPin: React.FC<UserPinProps> = ({
  openPinModal,
  onSubmit,
  setOpenPinModal,
  hideCancel,
  submitting,
}) => {
  const navigate = useNavigate();

  const { form, setForm, error, setError, setStep } = useInvestContext();

  function onClose() {
    setOpenPinModal(false);
    setError(undefined);
    setForm({});
    setStep(InvestSteps.SELECT_TYPE);
  }

  return (
    <>
      <ActionModal
        open={openPinModal}
        setOpen={() => onClose()}
        hideCancel={hideCancel}
        heading="Your BezoPin"
        modalWidth="max-w-[600px]"
        actionButtonProps={{
          onClick: () => {
            onSubmit?.();
          },
          loading: submitting,
          disabled: !form?.pin || form.pin.length < 4,
        }}
        cancelButtonProps={{
          onClick: () => {
            setOpenPinModal(false);
          },
        }}
      >
        <div className="px-7 flex flex-col">
          <Spacer className="h-3" />
          <p className="text-left font-sans text-xl text-neutral-500">
            Please enter your BezoPin to complete your investment
          </p>

          <Spacer className="h-1" />

          <p className="text-neutral-400 text-opacity-50 text-left text-sm">
            By making payment you agree to the{' '}
            <span className="text-primary-400 text-opacity-50 underline">terms and conditions</span>
          </p>

          <Spacer className="h-4" />

          <OtpInput
            value={form?.pin}
            numInputs={4}
            isInputSecure
            shouldAutoFocus={true}
            isInputNum={true}
            className="w-14 h-14"
            inputStyle={classNames(
              'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
              {
                ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100': error,
              }
            )}
            containerStyle={'flex lg:space-x-6 space-x-2'}
            onChange={(event: string) => {
              setForm({ ...form, pin: event });
              setError(undefined);
            }}
          />

          {error ? (
            <div className="flex items-start">
              <ErrorText>{error}</ErrorText>
            </div>
          ) : null}
        </div>

        <Spacer className="h-7" />

        <p className="text-sm font-sans px-7 text-left border-b border-neutral-200">
          If you've forgotten your BezoPIN, reset it on the{' '}
          <span className="font-sans text-primary-200">
            <button
              className="underline"
              onClick={() => {
                navigate('/dashboard/settings?tab=3');
              }}
            >
              settings page
            </button>
          </span>
          <Spacer className="h-6" />
        </p>
      </ActionModal>
    </>
  );
};
