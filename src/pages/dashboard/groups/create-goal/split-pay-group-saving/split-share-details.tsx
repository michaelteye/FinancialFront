import { Spacer } from '@/components/spacer';
import { useContext, useState } from 'react';
import { Input } from '@/components/input/input';
import { Select } from '@/components/input/select';
import { GroupGoalDetailsSchema } from '../../lib/schemas';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { CreateGroupSavingsForm } from '../../components/types';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { SavingGoalTypes, subscriptionOptions } from '../default-group-saving/default-saving-details';
import { GroupSavingsType, SplitandShareGroupSavingsSteps } from '../../lib/types';

export const SplitShareDetails = () => {
  const [errors, setErrors] = useState<CreateGroupSavingsForm>();
  const { step, showNextStep, showPrevStep, form, setValue, setStepChange } = useContext(
    CreateGroupSavingsGoalFormContext
  );

  const validate = async () => {
    GroupGoalDetailsSchema.validate(form, {
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

  if (
    step !== SplitandShareGroupSavingsSteps.SAVING_GOALS_DETAILS ||
    form?.nature !== GroupSavingsType.SPLIT_AND_SHARE
  ) {
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
          prefix={errors?.amountToSave ? '' : 'GHS'}
          error={errors?.amountToSave}
          onChange={(event) => {
            setValue('amountToSave', event.target.value);
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
          value={form?.accountType}
          error={errors?.accountType}
          label="What are you saving towards?"
          placeholder="eg. Rent,wedding"
          onChange={(event) => {
            setValue('accountType', event.target.value);
            clearError('accountType');
          }}
          options={SavingGoalTypes}
        />

        <div className="flex lg:w-1/2">
          <Select
            value={form.subscriptionType}
            error={errors?.subscriptionType}
            label="Membership subscription type"
            subLabel="Select how you want members of your group to join this goal"
            placeholder="eg: Optional"
            options={subscriptionOptions}
            onChange={(event) => {
              setValue('subscriptionType', event.target.value);
              clearError('subscriptionType');
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
          setStepChange?.(false);
        }}
      />

      <Spacer className="h-10" />
    </div>
  );
};
