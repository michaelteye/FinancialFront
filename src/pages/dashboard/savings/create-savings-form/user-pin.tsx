import * as yup from 'yup';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import OtpInput from 'react-otp-input';
import { Spacer } from '@/components/spacer';
import { useNavigate } from 'react-router-dom';
import { CreateSavingsAccountFormSteps, SavingsGoalForm, UserPinProps } from '../helpers/types';
import { ActionModal } from '@/components/modal/action-modal';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { CreateSavingsAccountFormContext } from '../components/form-context';

const UserPinSchema = yup.object().shape({
  userPin: yup.string().required('Pin is required'),
});

export const UserPin: React.FC<UserPinProps> = ({
  openPinModal,
  onSubmit,
  error,
  setOpenPinModal,
  onChange,
  hideCancel,
  submitting,
  form,
  message = '',
}) => {
  const [errors, setErrors] = useState<any>({});
  const { setStep, setForm } = useContext(CreateSavingsAccountFormContext);
  const navigate = useNavigate();
  function clearError(key: string) {
    setErrors({ ...errors, [key]: undefined });
  }

  const validate = async () => {
    UserPinSchema.validate(form, {
      abortEarly: false,
    })
      .then(() => {
        onSubmit?.();
      })
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  const defaultForm: () => SavingsGoalForm = () => ({
    goalType: '',
    goalName: '',
    lockSavings: false,
    startDate: new Date(),
    endDate: new Date(),
    accountTypeId: '',
    goalTypeId: '',
    emoji: '',
    goalPeriod: '',
    amountToSave: '',
    frequency: '',
    acceptsInterest: 'Yes',
    amountToRaise: '',
    depositPreference: 'manual',
  });

  return (
    <>
      <ActionModal
        open={openPinModal}
        hideCancel={hideCancel}
        hideHeader
        heading="Enter your BezoPin"
        modalWidth="max-w-[500px]"
        actionButtonProps={{
          onClick: () => {
            validate();
          },
          loading: submitting,
          disabled: !form?.userPin,
        }}
        cancelButtonProps={{
          onClick: () => {
            setOpenPinModal(false);
            setStep(CreateSavingsAccountFormSteps.SELECT_GOAL_TYPE);
            setForm(defaultForm());
          },
        }}
      >
        <div className="px-8 pt-12 flex flex-col">
          <p className="my-2 text-neutral-500">{message}</p>

          <Spacer className="h-4" />

          <OtpInput
            value={form?.userPin}
            numInputs={4}
            isInputSecure
            shouldAutoFocus={true}
            isInputNum={true}
            className="w-14 h-14"
            inputStyle={classNames(
              'otp-input border border-neutral-200 text-2xl font-sans-body lg:h-14 h-[47px] rounded-xl focus:outline-none focus:ring-1 focus:ring-primary-300',
              {
                ' border border-secondary-100 bg-secondary-100 bg-opacity-5 focus:border-secondary-100':
                  errors?.userPin,
              }
            )}
            containerStyle={'flex lg:space-x-6 space-x-2'}
            onChange={(event: string) => {
              onChange?.(event);
              clearError('userPin');
            }}
          />
          <div className="text-left">
            {errors.userPin ? <ErrorText>{errors?.userPin}</ErrorText> : null}
            {error ? <ErrorText>{error}</ErrorText> : null}
          </div>
        </div>

        <Spacer className="h-7" />

        <p className="text-sm font-sans px-8 text-left">
          If you've forgotten your BezoPIN, reset it on the{' '}
          <span className="font-sans text-primary-200">
            <button
              onClick={() => {
                navigate('/dashboard/settings?tab=3');
              }}
            >
              {' '}
              settings page
            </button>
          </span>
        </p>
      </ActionModal>
    </>
  );
};
