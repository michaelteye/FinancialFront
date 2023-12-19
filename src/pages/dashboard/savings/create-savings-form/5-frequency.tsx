import { useContext, useState } from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import { Spacer } from '@/components/spacer';
import { RadioInput } from '@/components/input/radio-input';
import { CreateSavingsAccountFormContext } from '../components/form-context';
import { ActionButtons } from '../components/action-buttons';

import * as yup from 'yup';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { ErrorText } from '@/pages/auth/register/personal-details-form/personal-details';
import { Input } from '@/components/input/input';
import { Flash } from '@/components/flash/flash';
import { Select } from '@/components/input/select';
import { useAuthStore } from '@/store/auth';
import { CreateSavingsAccountFormSteps, SavingsGoalForm } from '../helpers/types';
import { computeAmountToSave } from '../helpers';
import { Networks } from '@/store/types';

const SavingFrequencySchema = yup.object().shape({
  amountToSave: yup.string().required('This field cannot be left empty'),
  depositPreference: yup
    .string()
    .oneOf(['automatic', 'manual'], 'Please select your deposit preference')
    .required('Please select your deposit preference'),
});

const recieveInterest = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];
console.log('the saving goal info are >>>', SavingFrequencySchema);

// **************************************** main component ************************* //

export const Frequency = () => {
  const { defaultPaymentMethod } = useAuthStore();
  const [errors, setErrors] = useState<SavingsGoalForm>({});
  const [amountTooLow, setAmountTooLow] = useState<boolean>();
  const [enterPreferredAmount, setEnterPreferredAmount] = useState(false);
  const { step, form, setValue, showPreviousStep, showNextStep, setForm } = useContext(CreateSavingsAccountFormContext);
  const network = defaultPaymentMethod?.network;

  function clearError(key: string) {
    setErrors({ ...errors, [key]: undefined });
  }

  const computedAmountToSaveValue = Math.ceil(computeAmountToSave(form));

  const validate = async () => {
    SavingFrequencySchema.validate(
      {
        ...form,
        amountToSave: enterPreferredAmount ? form.amountToSave : computedAmountToSaveValue,
      },
      {
        abortEarly: false,
      }
    )
      .then(() => {
        if (computedAmountToSaveValue > parseFloat(form.amountToSave!) && amountTooLow === false) {
          setAmountTooLow(true);
          return;
        }

        if (computedAmountToSaveValue > parseFloat(form.amountToSave!) && amountTooLow) {
          showNextStep();
        }

        if (!form.amountToSave) {
          setValue('amountToSave', computedAmountToSaveValue);
        }
        showNextStep();
      })
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  console.log('DATA is ', form.depositPreference, form.category);
  console.log('The amount you entered is given as: ', enterPreferredAmount);
  console.log('The computered amount can be given as: ', computedAmountToSaveValue);
  console.log('the amount to save is ',form.amountToSave)

  return (
    <div
      className={classNames({
        hidden: step !== CreateSavingsAccountFormSteps.DURATION,
        '': step === CreateSavingsAccountFormSteps.DURATION,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        How much do you want to save {form.frequency}?
      </h1>

      <Spacer className=" h-8" />

      {/*  **************************** UPDATED SECTION ********************************** */}

      <div className=" w-full bg-neutral-100 text-xl font-sans text-neutral-500 rounded-xl px-5 py-7">
        <p className=" leading-8">
          By saving{' '}
          <span className="font-sans text-lg font-semibold text-tertiary-200">
            GHS {computedAmountToSaveValue} {form.frequency}
          </span>
          , you will reach your goal of GHS <span className="font-semibold">{form.amountToRaise}</span> by{' '}
          <span className=" font-semibold">{format(form?.endDate!, 'MMM do, yyyy')}</span>
        </p>
      </div>

      <Spacer className=" h-5" />

      <div className=" flex flex-col space-y-3 lg:space-y-0 ">
        <RadioInput
          id="use-uggested-amount"
          text={
            <>
              Proceed with recommended amount (
              <span className="font-semibold font-sans">
                GHS {computedAmountToSaveValue} {form.frequency}
              </span>
              )
            </>
          }
          name="suggested-saving"
          value={computedAmountToSaveValue.toString()}
          className=" bg-white"
          checked={!enterPreferredAmount}
          onChange={() => {
            setEnterPreferredAmount(false);
            setAmountTooLow(false);
            setValue('amountToSave', computedAmountToSaveValue.toString());
            clearError('amountToSave');
          }}
        />

        <RadioInput
          text="Enter a preferred amount"
          name="suggested-saving"
          id="enter-preferred-amount"
          checked={enterPreferredAmount}
          className=" bg-white"
          onChange={() => {
            setEnterPreferredAmount(true);
          }}
        />
      </div>


      {errors.amountToSave ? <ErrorText>{errors?.amountToSave}</ErrorText> : null}
      <div>
        {/*  ************************************CONDITIONALLY RENDER INPUT***********************************************  */}

        {enterPreferredAmount ? (
          <>
            <Spacer className=" h-2" />

            <Input
              placeholder="eg. 20"
              className="w-full"
              mask="G\H\S\ 9999999999999999999"
              onChange={(event) => {
                setValue('amountToSave', event.target.value?.split(' ')[1]);
                setAmountTooLow(false);
                clearError('amountToSave');
              }}
            />
          </>
        ) : null}

        {amountTooLow ? (
          <>
            <Spacer className=" h-8" />

            <Flash variant="warning">
              Saving GHS {form.amountToSave} {form.frequency}, you may not reach your target by{' '}
              {format(form?.endDate!, 'MMM do, yyyy')} Try GHS {computedAmountToSaveValue} or higher.
            </Flash>
          </>
        ) : null}

        {network === Networks.MTN ? (
          <>
            {' '}
            <Spacer className="h-10" />
            <div>
              <p className="font-sans text-lg text-neutral-500 font-medium">Do you want to automate your savings?</p>

              <Spacer className=" h-2" />

              <div className="flex sm:flex-row w-full flex-col items-center sm:space-x-4 space-x-0 sm:space-y-0 space-y-4">
                <RadioInput
                  text="Yes, auto-debit me from my BezoWallet"
                  name="depositPreference"
                  id="auto-bezowallet"
                  className="w-full"
                  checked={form.depositPreference === 'automatic' && form.category === 'BEZOPRIMARY'}
                  onChange={() => {
                    setValue('depositPreference', 'automatic');
                    setValue('category', 'BEZOPRIMARY');
                  }}
                />

                <RadioInput
                  text="No, I want to save when I can"
                  name="depositPreference"
                  id="manual"
                  className="w-full"
                  checked={form.depositPreference === 'manual'}
                  onChange={() => {
                    setValue('depositPreference', 'manual');
                    setValue('category', undefined);
                  }}
                />
              </div>

              <Spacer className=" h-2" />

              {/* auto deduct from primary wallet goes here */}
              <div className="flex sm:flex-row sm:w-1/2 flex-col items-center sm:space-x-4 space-x-0 sm:space-y-0 space-y-4">
                {/* Momo goes here */}
                {/* <RadioInput
                  text="Yes, debit me automatically from MoMo"
                  name="depositPreference"
                  id="auto-momo"
                  className="w-full"
                  checked={form.depositPreference === 'automatic' && form.category === 'MOMO'}
                  onChange={() => {
                    setValue('depositPreference', 'automatic')
                    setValue('category', 'MOMO')

                }}
                /> */}
              </div>
            </div>
          </>
        ) : null}

        <Spacer className="h-10" />

        <div className="lg:w-1/2 w-full">
          <Select
            label="Will you like to receive interest on your savings?"
            placeholder={form?.acceptsInterest}
            onChange={(event) => {
              setValue('acceptsInterest', event.target.value);
            }}
            options={recieveInterest}
          />
        </div>
        {/*  ************************************CONDITIONALLY RENDER INPUT***********************************************  */}
      </div>

      <Spacer className="h-10 sm:h-20" />

      <ActionButtons
        onNext={() => {
          validate();
        }}
        onPrevious={() => showPreviousStep()}
      />

      <Spacer className="sm:hidden h-24" />
      <Spacer className="sm:hidden h-10" />
    </div>
  );
};
