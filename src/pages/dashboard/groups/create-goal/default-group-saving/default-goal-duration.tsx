import { add, format } from 'date-fns';
import { Spacer } from '@/components/spacer';
import { useContext, useState } from 'react';
import { Input } from '@/components/input/input';
import { Notice } from '@/components/flash/flash';
import { DefaultGoalPeriodSchema } from '../../lib/schemas';
import { RadioInput } from '@/components/input/radio-input';
import { CreateGroupSavingsForm } from '../../components/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { DefaultGroupSavingsSteps, GroupSavingsType } from '../../lib/types';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { resolveEndDate } from '@/pages/dashboard/savings/helpers';

export const DefaultGoalDuration = () => {
  const [errors, setErrors] = useState<CreateGroupSavingsForm>();
  const { step, showPrevStep, showNextStep, form, setValue } = useContext(CreateGroupSavingsGoalFormContext);

  const validate = async () => {
    DefaultGoalPeriodSchema.validate(form, {
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

  if (step !== DefaultGroupSavingsSteps.SAVINGS_DURATION || form?.nature !== GroupSavingsType.DEFAULT) {
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
              checked={form.goalPeriod === '3'}
              onChange={() => {
                setValue('goalPeriod', '3');
                setValue('endDate', resolveEndDate('3 months'));

                clearError('goalPeriod');
              }}
            />
            <RadioInput
              id="6-months-saving-period"
              text="6 Months"
              name="saving-period"
              className="lg:mr-0 mt-2"
              checked={form.goalPeriod === '6'}
              onChange={() => {
                setValue('goalPeriod', '6');
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
              checked={form.goalPeriod === '9'}
              onChange={() => {
                setValue('goalPeriod', '9');
                setValue('endDate', resolveEndDate('9 months'));

                clearError('goalPeriod');
              }}
            />
            <RadioInput
              id="1-year-saving-period"
              text="1 Year"
              name="saving-period"
              className="lg:mr-0 mt-2"
              checked={form.goalPeriod === '12'}
              onChange={() => {
                setValue('goalPeriod', '12');
                setValue('endDate', resolveEndDate('1 year'));

                clearError('goalPeriod');
              }}
            />
          </div>

          <div className="flex lg:w-1/3">
            <RadioInput
              className="w-full"
              id="enter-custom-date"
              text="Enter a custom date"
              name="saving-period"
              checked={form.goalPeriod === 'custom'}
              onChange={() => {
                setValue('goalPeriod', 'custom');
                clearError('goalPeriod');
              }}
            />
          </div>
        </div>
        {form.goalPeriod === 'custom' ? (
          <>
            <Spacer className=" h-4" />

            <div className=" lg:w-1/3 w-2/3">
              <div className=" flex flex-col space-x-8">
                <div id="custom-date" className=" relative flex items-center w-full">
                  <Input
                    type="date"
                    min={format(
                      add(new Date(), {
                        days: 1,
                      }),
                      'yyyy-MM-dd'
                    )}
                    value={format(form.endDate ? form.endDate : new Date(), 'yyyy-MM-dd')}
                    onChange={(event) => {
                      setValue('endDate', new Date(event.target.value));
                      clearError('goalPeriod');
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : null}

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

      <Spacer className="h-10" />

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
