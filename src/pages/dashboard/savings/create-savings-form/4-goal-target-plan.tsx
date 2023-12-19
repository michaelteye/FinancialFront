import * as yup from 'yup';
import classNames from 'classnames';
import { useContext, useState } from 'react';

import { add } from 'date-fns';
import format from 'date-fns/format';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { RadioInput } from '@/components/input/radio-input';
import { ActionButtons } from '../components/action-buttons';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { CreateSavingsAccountFormContext } from '../components/form-context';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { CreateSavingsAccountFormSteps, SavingsGoalForm } from '../helpers/types';
import { resolveEndDate } from '../helpers';
import { Notice } from '@/components/flash/flash';
import { CONST } from '../../tools/constants';
import { LockTypes } from '../../tools/types';

const savingsGoalTargetSchema = yup.object().shape({
  goalPeriod: yup
    .string()
    .required('This field is required')
    .oneOf(['9 months', '6 months', '3 months', '1 month', '1 year', 'custom'], 'Please select your goal period'),
  frequency: yup
    .string()
    .required('this field is required')
    .oneOf(['Daily', 'Weekly', 'Monthly'], 'Please select your saving frequency'),
  amountToRaise: yup.string().required('This field cannot be left empty'),
});

export const GoalTargetPlan = () => {
  const [errors, setErrors] = useState<SavingsGoalForm>({});
  const { step, setValue, form, showPreviousStep, showNextStep } = useContext(CreateSavingsAccountFormContext);

  const validate = async () => {
    savingsGoalTargetSchema
      .validate(form, {
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

  return (
    <div
      className={classNames({
        hidden: step !== CreateSavingsAccountFormSteps.GOAL_TARGET_PLAN,
        '': step === CreateSavingsAccountFormSteps.GOAL_TARGET_PLAN,
      })}
    >
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">Savings goal plan</h1>

      <Spacer className="h-3" />

      <Notice
        text={`All goals are locked for the goal duration. Early withdrawals attract a ${
          form.accountType?.name === LockTypes.BEZO_LOCK ? CONST.BEZO_LOCK_CHARGES : CONST.BEZO_FLEX_CHARGES
        } fee.`}
      />

      <Spacer className=" h-6" />

      <p className=" font-sans text-lg text-neutral-500 font-medium">What is your target amount?</p>
      <p className=" font-sans-body text-[#4F4F4F]">Enter the amount you intend to save</p>

      <Spacer className=" h-2" />

      <Input
        placeholder="eg. 20,000"
        error={errors.amountToRaise}
        value={form.amountToRaise}
        mask="G\H\S\ 9999999999999999999"
        onChange={(event) => {
          setValue('amountToRaise', event.target.value?.split(' ')[1]);
          clearError('amountToRaise');
        }}
      />

      <Spacer className=" h-8" />

      {/*  **************************************** UPDATED SCETION ************************************* */}

      <div>
        <p className=" font-sans text-lg text-neutral-500 font-medium">How long will you like to save for?</p>

        <Spacer className=" h-3" />

        <div className=" flex flex-col space-y-4">
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
            {form.accountType?.name === LockTypes.BEZO_LOCK ? null : (
              <RadioInput
                id="1-month-saving-period"
                text="1 Month"
                name="saving-period"
                className="lg:mr-0 mt-2"
                checked={form.goalPeriod === '1 month'}
                onChange={() => {
                  setValue('goalPeriod', '1 month');
                  setValue('endDate', resolveEndDate('1 month'));

                  clearError('goalPeriod');
                }}
              />
            )}

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
            {form.accountType?.name === LockTypes.BEZO_LOCK && (
              <RadioInput
                id="1-year-saving-period"
                text="1 Year"
                name="saving-period"
                className="lg:mr-0 mt-2"
                value="1 Year"
                checked={form.goalPeriod === '1 year'}
                onChange={() => {
                  setValue('goalPeriod', '1 year');
                  setValue('endDate', resolveEndDate('1 year'));

                  clearError('goalPeriod');
                }}
              />
            )}
          </div>

          {form.accountType?.name === LockTypes.BEZO_LOCK ? null : (
            <div className="flex">
              <RadioInput
                id="enter-custom-date"
                className="lg:w-1/2"
                text="Custom date"
                name="saving-period"
                checked={form.goalPeriod === 'custom'}
                onChange={() => {
                  setValue('goalPeriod', 'custom');
                  setValue('endDate', resolveEndDate('3 months'));
                  clearError('goalPeriod');
                }}
              />
            </div>
          )}
        </div>
        {form.goalPeriod === 'custom' ? (
          <>
            <Spacer className=" h-4" />
            <div className=" lg:w-1/3 w-2/3">
              <div className=" flex flex-col space-x-8">
                <div id="date-of-birth" className=" relative flex items-center w-full">
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

        {errors.goalPeriod ? <ErrorText>{errors?.goalPeriod}</ErrorText> : null}

        <Spacer className=" h-8" />

        <p className=" font-sans text-lg text-neutral-500 font-medium">How frequently would you like to save? </p>

        <Spacer className=" h-5" />

        <div className=" flex lg:space-x-5 space-x-3">
          <RadioInput
            id="daily-savings-period"
            text="Daily"
            name="savings-period-frequency"
            checked={form.frequency === 'Daily'}
            onChange={() => {
              setValue('frequency', 'Daily');
              clearError('frequency');
            }}
          />
          <RadioInput
            id="weekly-savings-period"
            text="Weekly"
            name="savings-period-frequency"
            checked={form.frequency === 'Weekly'}
            onChange={() => {
              setValue('frequency', 'Weekly');
              clearError('frequency');
            }}
          />
          <RadioInput
            id="monthly-savings-period"
            text="Monthly"
            name="savings-period-frequency"
            checked={form.frequency === 'Monthly'}
            onChange={() => {
              setValue('frequency', 'Monthly');
              clearError('frequency');
            }}
          />
        </div>

        {errors.frequency ? <ErrorText>{errors?.frequency}</ErrorText> : null}

        <Spacer className="h-10 sm:h-20" />
      </div>

      <Spacer className="hidden sm:flex h-24" />

      <ActionButtons
        onNext={() => {
          validate();
        }}
        onPrevious={() => {
          showPreviousStep();
        }}
      />

      <Spacer className="sm:hidden h-24" />
      <Spacer className="sm:hidden h-10" />
    </div>
  );
};
