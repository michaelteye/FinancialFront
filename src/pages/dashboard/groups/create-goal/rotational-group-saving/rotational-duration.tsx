import * as yup from 'yup';
import { useContext, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Notice } from '@/components/flash/flash';
import { RadioInput } from '@/components/input/radio-input';
import { CreateGroupSavingsForm } from '../../components/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { CreateGroupSavingsGoalFormContext } from './../create-group-goal-context';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { GroupSavingsType, RotationalGroupSavingsSteps } from '../../lib/types';

export const RotationalGoalPeriodSchema = yup.object().shape({
  withdrawalFrequency: yup
    .string()
    .required()
    .oneOf(['week', 'month', 'quarter'], 'Please select how often you want to withdraw'),
  frequency: yup.string().required().oneOf(['daily', 'weekly', 'monthly'], 'Please select your saving frequency'),
});

export const RotationalGoalDuration = () => {
  const [errors, setErrors] = useState<CreateGroupSavingsForm>();
  const { step, showPrevStep, showNextStep, form, setValue } = useContext(CreateGroupSavingsGoalFormContext);

  const validate = async () => {
    RotationalGoalPeriodSchema.validate(form, {
      abortEarly: false,
    })
      .then(() => {
        showNextStep();
      })
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  function clearError(key: string) {
    setErrors({ ...errors, [key]: undefined });
  }

  if (step !== RotationalGroupSavingsSteps.SAVINGS_DURATION || form?.nature !== GroupSavingsType.ROTATIONAL) {
    return null;
  }

  return (
    <div>
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Saving durations and date</h1>

      <Spacer className="h-6" />

      <p className="font-sans text-[#000]">Please tell us how long you will like have this goal.</p>

      <Spacer className="h-6" />

      <Notice text="You'll be charged 2% for early withdrawals" />

      <Spacer className="h-6" />

      <div>
        <p className=" font-sans text-lg text-neutral-500 font-medium">How frequently would you like to save? </p>

        <Spacer className=" h-3" />

        <div className=" flex flex-col space-y-4">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
            <RadioInput
              id="daily"
              text="Daily"
              name="saving-frequency"
              className="lg:mr-0 mt-2"
              checked={form.frequency === 'daily'}
              onChange={() => {
                setValue('frequency', 'daily');
                clearError('frequency');
              }}
            />
            <RadioInput
              id="weekly"
              text="Weekly"
              name="saving-frequency"
              className="lg:mr-0 mt-2"
              checked={form.frequency === 'weekly'}
              onChange={() => {
                setValue('frequency', 'weekly');

                clearError('frequency');
              }}
            />

            <RadioInput
              id="monthly"
              text="Monthly"
              name="saving-frequency"
              className="lg:mr-0 mt-2"
              value="Monthly"
              checked={form.frequency === 'monthly'}
              onChange={() => {
                setValue('frequency', 'monthly');

                clearError('frequency');
              }}
            />
          </div>
        </div>

        {errors?.frequency ? <ErrorText>Please select your saving frequency</ErrorText> : null}

        <Spacer className=" h-8" />

        <p className=" font-sans text-lg text-neutral-500 font-medium">How often would you like to withdraw?</p>

        <Spacer className=" h-5" />

        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
          <RadioInput
            id="weekly-withdrawal-frequency"
            text="Weekly"
            name="withdrawal-frequency"
            checked={form.withdrawalFrequency === 'week'}
            onChange={() => {
              setValue('withdrawalFrequency', 'week');
              clearError('withdrawalFrequency');
            }}
          />
          <RadioInput
            id="monthly-withdrawal-frequency"
            text="Monthly"
            name="withdrawal-frequency"
            checked={form.withdrawalFrequency === 'month'}
            onChange={() => {
              setValue('withdrawalFrequency', 'month');
              clearError('withdrawalFrequency');
            }}
          />
          <RadioInput
            id="3-months-withdrawal-frequency"
            text="Every 3 months"
            name="withdrawal-frequency"
            checked={form.withdrawalFrequency === 'quarter'}
            onChange={() => {
              setValue('withdrawalFrequency', 'quarter');
              clearError('withdrawalFrequency');
            }}
          />
        </div>

        {errors?.withdrawalFrequency ? <ErrorText>Please select how often you want to withdraw</ErrorText> : null}

        <Spacer className="h-4 sm:h-6" />
      </div>
      {form.withdrawalFrequency ? (
        <Notice
          text={
            <p>
              You have chosen to withdraw <span className=" text-base font-extrabold">{form.withdrawalFrequency}</span>.
              This means that until the end date or until everyone in the goal has been served, funds will be withdrawn{' '}
              each <span className=" text-base font-extrabold">{form.withdrawalFrequency}</span>. to the person who's
              turn is next.
            </p>
          }
        />
      ) : null}

      <Spacer className="h-10 sm:h-20" />

      <ActionButtons
        onNext={() => {
          validate();
        }}
        onPrevious={() => {
          showPrevStep();
        }}
      />
    </div>
  );
};
