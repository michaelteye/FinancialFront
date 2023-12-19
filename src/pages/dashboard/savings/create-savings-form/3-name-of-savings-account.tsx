import { useContext, useState } from 'react';
import classNames from 'classnames';
import * as yup from 'yup';

import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { CreateSavingsAccountFormContext } from '@/pages/dashboard/savings/components/form-context';
import { ActionButtons } from '../components/action-buttons';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { CreateSavingsAccountFormSteps } from '../helpers/types';
import { resolveExampleGoalTitle } from '../helpers';

//  return different example paragraphs for a difference goal types chosen

const savingsGoalTitleSchema = yup.object().shape({
  goalName: yup.string().required('Saving account title can not be empty'),
});

export function NameOfSavingsAccount() {
  const { step, form, setValue, showNextStep, showPreviousStep } = useContext(CreateSavingsAccountFormContext);
  const [errors, setErrors] = useState<any>({});

  const validate = async () => {
    savingsGoalTitleSchema
      .validate(form, {
        abortEarly: false,
      })
      .then(() => showNextStep())
      .catch((error) => {
        setErrors(parseErrorsToMap(error));
      });
  };

  function clearError(key: string) {
    setErrors({ ...errors, [key]: undefined });
  }

  const savingTitleExamples = resolveExampleGoalTitle(form.goalType);

  return (
    <div
      className={classNames({
        hidden: step !== CreateSavingsAccountFormSteps.NAME_OF_SAVINGS_ACCOUNT,
        '': step === CreateSavingsAccountFormSteps.NAME_OF_SAVINGS_ACCOUNT,
      })}
    >
      <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">
        What would you like to call your <span className=" lowercase">{form.goalType}</span> savings goal?
      </h1>

      <p className="font-sans-body text-[#4F4F4F] ">{savingTitleExamples}</p>

      <Spacer className="h-5" />

      <Input
        placeholder="Enter goal title here"
        error={errors.goalName}
        onChange={(event) => {
          setValue('goalName', event.target.value);
          clearError('goalName');
        }}
      />

      <Spacer className=" h-6" />

      <ActionButtons
        onNext={() => {
          validate();
        }}
        onPrevious={() => showPreviousStep()}
      />
    </div>
  );
}
