import * as yup from 'yup';
import classNames from 'classnames';
import format from 'date-fns/format';
import { useContext, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/button';
import { Input } from '@/components/input/input';
import { RadioInput } from '@/components/input/radio-input';
import { editSavingsGoalFormContext } from './edit-goal-context';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';

import { differenceInCalendarDays } from 'date-fns';
import { computeAmountToSave } from '../helpers';
import { editSavingGoalSteps } from '../helpers/types';
import { Networks } from '@/store/types';
import { useAuthStore } from '@/store/auth';

// const editGoalDetailsSchema = yup.object().shape({
//   savingGoalName: yup.string().required('Please provide the goal name'),
//   amountToRaise: yup.string().required('Please provide the amount you want to raise'),
//   goalPeriod: yup.string().required('Please provide info on the goal period'),
//   frequency: yup.string().required('This field is required'),
//   amountToSave: yup.string().required('This field is required'),
//   depositPreference: yup.string().required('please this field cannot be left unchecked'),
// });

export const GoalDetails: React.FC<{ openCloseGoal?: () => void }> = ({ openCloseGoal }) => {
  const { defaultPaymentMethod } = useAuthStore();
  const [errors, setErrors] = useState<any>({});
  const [enterPreferredAmount, setEnterPreferredAmount] = useState(false);
  const { form, step, showNextStep, setValue } = useContext(editSavingsGoalFormContext);
  const network = defaultPaymentMethod?.network;
  // const validate = async () => {
  //   editGoalDetailsSchema
  //     .validate(form, {
  //       abortEarly: false,
  //     })
  //     .then(() => {
  //       showNextStep();
  //     })
  //     .catch((error) => {
  //       setErrors(parseErrorsToMap(error));
  //     });
  // };

  const clearError = (key: string) => {
    setErrors({
      ...errors,
      [key]: undefined,
    });
  };

  const computedAmountToSaveValue = Math.ceil(computeAmountToSave(form));
  const daysLeft = differenceInCalendarDays(new Date(form?.endDate!), new Date());

  return (
    <>
      <div
        className={classNames({
          hidden: step !== editSavingGoalSteps.GOAL_DETAILS,
          '': step === editSavingGoalSteps.GOAL_DETAILS,
        })}
      >
        <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
          How would you like to edit your <br /> <span className=" lowercase">{form.goalType}</span> saving account?
        </h1>
        <Spacer className=" h-5" />

        <Input
          placeholder="Enter goal name here"
          error={errors.goalName}
          value={form.savingGoalName}
          onChange={(event) => {
            setValue('savingGoalName', event.target.value);
            clearError('goalName');
          }}
        />

        <Spacer className=" h-6" />

        {network === Networks.MTN ? (
          <>
            {' '}
            <Spacer className="h-5" />
            <div>
              <p className=" font-sans text-lg text-neutral-500 font-medium">Do you want to automate your savings?</p>

              <Spacer className=" h-2" />

              <div className="flex sm:flex-row w-full flex-col items-center sm:space-x-4 space-x-0 sm:space-y-0 space-y-4">
                <RadioInput
                  text="Yes, debit me automatically from MoMo"
                  name="depositPreference"
                  id="auto"
                  className="w-full"
                  checked={form.depositPreference === 'automatic'}
                  onChange={() => setValue('depositPreference', 'automatic')}
                />

                <RadioInput
                  text="No, I want to save when I can"
                  name="depositPreference"
                  id="manual"
                  className="w-full"
                  checked={form.depositPreference === 'manual'}
                  onChange={() => {
                    setValue('depositPreference', 'manual');
                  }}
                />
              </div>
            </div>
          </>
        ) : null}

        <>
          <Spacer className=" h-6" />

          <p className=" font-sans text-lg text-neutral-500 font-medium">Suggested saving</p>

          <Spacer className=" h-3" />

          <div className=" w-full bg-neutral-100 text-lg font-sans text-neutral-500 rounded-xl px-5 py-5">
            <p className=" leading-8">
              Saving{' '}
              <span className="font-sans text-lg font-semibold text-tertiary-200">
                GHS {computedAmountToSaveValue || '0.00'}
              </span>{' '}
              {form.frequency} , you will reach your target, which has been set to end{' '}
              {format(form.endDate!, 'MMM do, yyyy')}
            </p>
          </div>

          <Spacer className=" h-5" />

          <div className=" flex flex-wrap lg:space-x-2 space-y-3 lg:space-y-0 ">
            <RadioInput
              id="use-uggested-amount"
              text="Use suggested amount"
              name="suggested-saving"
              checked={!enterPreferredAmount}
              className=" bg-white"
              onChange={() => {
                setValue('amountToSave', computedAmountToSaveValue);
                clearError('amountToSave');
                setEnterPreferredAmount(false);
              }}
            />
            <RadioInput
              text="Enter a preferred amount"
              name="suggested-saving"
              id="enter-preferred-amount"
              value="preferred-amount"
              className=" bg-white"
              checked={enterPreferredAmount}
              onChange={() => {
                setEnterPreferredAmount(true);
                clearError('amountToSave');
              }}
            />
          </div>
        </>

        {errors.amountToSave ? <ErrorText>{errors?.amountToSave}</ErrorText> : null}

        <div>
          {enterPreferredAmount ? (
            <>
              <Spacer className=" h-2" />

              <Input
                placeholder="eg. 20"
                className="w-full"
                mask="G\H\S\ 9999999999999999999"
                value={form.amountToSave}
                onChange={(event) => {
                  setValue('amountToSave', event?.target.value.split(' ')[1]);
                  clearError('amountToSave');
                }}
              />
            </>
          ) : null}
        </div>

        <Spacer className=" h-6" />

        <div className="flex flex-col space-y-1 lg:w-1/2">
          <p className="font-sans text-lg font-semibold">End savings goal</p>
          <p className="font-sans text-sm ">Are you sure you want to end this goal?</p>

          <div className="lg:w-3/5">
            <Button
              onClick={() => {
                openCloseGoal?.();
              }}
              className="bg-[#FF5029] hover:bg-[#FF5029] hover:bg-opacity-[0.85] text-white w-full"
            >
              End goal
            </Button>
          </div>
        </div>

        <Spacer className="h-8" />

        <div className="h-1 bg-neutral-300 rounded-lg"></div>

        <Spacer className="h-8" />

        <div className="flex justify-end">
          <Button
            onClick={() => {
              showNextStep();
            }}
          >
            {' '}
            Continue{' '}
          </Button>
        </div>

        <Spacer className="h-8" />
      </div>
    </>
  );
};
