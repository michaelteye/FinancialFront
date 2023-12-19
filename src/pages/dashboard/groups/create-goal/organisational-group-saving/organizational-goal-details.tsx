import * as yup from 'yup';
import { useContext, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { Select } from '@/components/input/select';
import { CreateGroupSavingsForm } from '../../components/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { SavingGoalTypes, subscriptionOptions } from '../default-group-saving/default-saving-details';
import { GroupSavingsType, OrganizationalGroupSavingsSteps } from '../../lib/types';

export const GroupGoalDetailsSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  amountToSave: yup.string().required('This field cannot be left empty'),
  accountType: yup.string().required('This is a required field'),
  subscriptionType: yup.string().required('This is a required field'),
});

export const OrganizationalGoalDetails = () => {
  const [errors, setErrors] = useState<CreateGroupSavingsForm>();
  const { step, showNextStep, showPrevStep, form, setValue } = useContext(CreateGroupSavingsGoalFormContext);

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
    step !== OrganizationalGroupSavingsSteps.SAVING_GOALS_DETAILS ||
    form?.nature !== GroupSavingsType.ORGANIZATIONAL
  ) {
    return null;
  }

  return (
    <div>
      <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Group savings details</h1>

      <Spacer className="h-6" />

      <div className="flex flex-col space-y-7">
        <Input
          error={errors?.goalName}
          onChange={(event) => {
            setValue('goalName', event.target.value);
            clearError('goalName');
          }}
          label="Saving goal title"
          placeholder="eg. School gate renovations"
        />

        <Input
          error={errors?.amountToSave}
          onChange={(event) => {
            setValue('amountToSave', event.target.value);
            clearError('amountToSave');
          }}
          label="How much do you want each member to save at time?"
          placeholder=" eg. 20"
          mask="GHS 9999999999999999"
        />

        <Input
          onChange={(event) => {
            setValue('description', event.target.value);
          }}
          label="Group description"
          placeholder="eg. Class of 2021"
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

        <div className="flex lg:space-x-3 lg:w-1/2">
          <Select
            value={form.subscriptionType}
            error={errors?.subscriptionType}
            onChange={(event) => {
              setValue('subscriptionType', event.target.value);
              clearError('subscriptionType');
            }}
            options={subscriptionOptions}
            label="Membership subscription type"
            subLabel="Select how you want members of your group to join this goal"
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
        }}
      />

      <Spacer className="h-10" />
    </div>
  );
};
