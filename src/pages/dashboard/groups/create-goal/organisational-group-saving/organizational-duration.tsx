import * as yup from 'yup';
import { Spacer } from '@/components/spacer';
import { useContext, useState } from 'react';
import { Notice } from '@/components/flash/flash';
import { RadioInput } from '@/components/input/radio-input';
import { CreateGroupSavingsForm } from '../../components/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { OrgGoalPeriodSchema } from '../../lib/schemas';
import { GroupSavingsType, OrganizationalGroupSavingsSteps } from '../../lib/types';
import { resolveEndDate } from '@/pages/dashboard/savings/helpers';

export const OrganizationalGoalDuration = () => {
  const [errors, setErrors] = useState<CreateGroupSavingsForm>();
  const { step, showPrevStep, showNextStep, form, setValue } = useContext(CreateGroupSavingsGoalFormContext);

  const validate = async () => {
    OrgGoalPeriodSchema.validate(form, {
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

  if (step !== OrganizationalGroupSavingsSteps.SAVINGS_DURATION || form?.nature !== GroupSavingsType.ORGANIZATIONAL) {
    return null;
  }

  return (
    <div>
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Saving durations and date</h1>

      <Spacer className="h-4" />

      <p className="font-sans text-[#000]">Please tell us how long you will like have this goal.</p>

      <Spacer className="h-4" />

      <Notice text="You'll be charged 2% for early withdrawals" />

      <Spacer className="h-4" />

      <div>
        <p className=" font-sans text-lg text-neutral-500 font-medium">How long will you like to save for?</p>

        <Spacer className=" h-3" />

        <div className=" flex flex-col space-y-4">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
            <RadioInput
              id="3-months-saving-period"
              text="3 Months"
              name="saving-period"
              className="lg:mr-0 mt-2"
              checked={form.goalPeriod === '3 months'}
              onChange={() => {
                setValue('goalPeriod', '3 months');
                setValue('endDate', resolveEndDate('3 months'));

                clearError('goalPeriod');
              }}
            />
            <RadioInput
              id="6-months-saving-period"
              text="6 Months"
              name="saving-period"
              className="lg:mr-0 mt-2"
              checked={form.goalPeriod === '6 months'}
              onChange={() => {
                setValue('goalPeriod', '6 months');
                setValue('endDate', resolveEndDate('6 months'));

                clearError('goalPeriod');
              }}
            />

            <RadioInput
              id="9-months-saving-period"
              text="9 Months"
              name="saving-period"
              className="lg:mr-0 mt-2"
              value="9 Months"
              checked={form.goalPeriod === '9 months'}
              onChange={() => {
                setValue('goalPeriod', '9 months');
                setValue('endDate', resolveEndDate('9 months'));

                clearError('goalPeriod');
              }}
            />
            <RadioInput
              id="1-year-saving-period"
              text="1 Year"
              name="saving-period"
              className="lg:mr-0 mt-2"
              checked={form.goalPeriod === '1 year'}
              onChange={() => {
                setValue('goalPeriod', '1 year');
                setValue('endDate', resolveEndDate('1 year'));

                clearError('goalPeriod');
              }}
            />
          </div>
        </div>

        {errors?.goalPeriod ? <ErrorText>{errors?.goalPeriod}</ErrorText> : null}

        <Spacer className=" h-8" />

        <p className=" font-sans text-lg text-neutral-500 font-medium">How frequently would you like to save? </p>

        <Spacer className=" h-5" />

        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-3">
          <RadioInput
            id="daily-savings-period"
            text="Daily"
            name="savings-period-frequency"
            checked={form.frequency === 'daily'}
            onChange={() => {
              setValue('frequency', 'daily');
              clearError('frequency');
            }}
          />
          <RadioInput
            id="weekly-savings-period"
            text="Weekly"
            name="savings-period-frequency"
            checked={form.frequency === 'weekly'}
            onChange={() => {
              setValue('frequency', 'weekly');
              clearError('frequency');
            }}
          />
          <RadioInput
            id="monthly-savings-period"
            text="Monthly"
            name="savings-period-frequency"
            checked={form.frequency === 'monthly'}
            onChange={() => {
              setValue('frequency', 'monthly');
              clearError('frequency');
            }}
          />
        </div>

        {errors?.frequency ? <ErrorText>{errors?.frequency}</ErrorText> : null}

        <Spacer className="h-10 sm:h-20" />
      </div>

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
