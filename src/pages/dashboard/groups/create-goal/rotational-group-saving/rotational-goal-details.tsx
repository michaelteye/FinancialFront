import * as yup from 'yup';
import { useContext, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { Select } from '@/components/input/select';
import { CreateGroupSavingsForm } from '../../components/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { SavingGoalTypes } from '../default-group-saving/default-saving-details';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { CreateGroupSavingsGoalFormContext } from './../create-group-goal-context';
import { RotationalGroupGoalDetailsSchema } from '../../lib/schemas';
import { GroupSavingsType, RotationalGroupSavingsSteps } from '../../lib/types';

export const RotationalGoalDetails = () => {
  const [errors, setErrors] = useState<CreateGroupSavingsForm>();
  const { step, showNextStep, showPrevStep, form, setValue, setStepChange } = useContext(
    CreateGroupSavingsGoalFormContext
  );

  const validate = async () => {
    RotationalGroupGoalDetailsSchema.validate(form, {
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

  if (step !== RotationalGroupSavingsSteps.SAVING_GOALS_DETAILS || form?.nature !== GroupSavingsType.ROTATIONAL) {
    return null;
  }
  return (
    <div>
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Group savings details</h1>

      <Spacer className="h-6" />

      <div className="flex flex-col space-y-7">
        <Input
          label="Saving goal title"
          placeholder="eg. School gate renovations"
          error={errors?.goalName}
          onChange={(event) => {
            setValue('goalName', event.target.value);
            clearError('goalName');
          }}
        />

        <Input
          label="How much do you want each member to save at time?"
          placeholder=" eg. 20"
          mask="GHS 9999999999999999"
          error={errors?.amountToSave}
          onChange={(event) => {
            setValue('amountToSave', event?.target?.value?.substring(4));
            clearError('amountToSave');
          }}
        />

        <Input
          label="Group description"
          placeholder="eg. Class of 2021"
          onChange={(event) => {
            setValue('description', event.target.value);
          }}
        />

        <Select
          label="What are you saving towards?"
          placeholder="eg. Rent,wedding"
          value={form.accountType}
          error={errors?.accountType}
          onChange={(event) => {
            setValue('accountType', event.target.value);
            clearError('accountType');
          }}
          options={SavingGoalTypes}
        />

        <div className="flex lg:flex-row flex-col lg:space-y-0 space-y-7 lg:space-x-3">
          <Input
            label="Membership subscription type"
            value="Custom: Its optional to join this goal"
            disabled
            subLabel="Select how you want members of your group to join this goal"
          />

          <Input
            type="number"
            label=" Number of slots"
            error={errors?.slots}
            subLabel="Number of Slots available for participants of this goal"
            onChange={(event) => {
              setValue('slots', event.target.value);
              clearError('slots');
            }}
          />
        </div>
      </div>

      <Spacer className="h-10" />

      <ActionButtons
        onNext={() => {
          validate();
        }}
        onPrevious={() => {
          showPrevStep();
          setErrors({});
          setStepChange?.(false);
        }}
      />

      <Spacer className="h-10" />
    </div>
  );
};
