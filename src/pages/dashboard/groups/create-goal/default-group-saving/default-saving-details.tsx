import * as yup from 'yup';
import { useContext, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { Select } from '@/components/input/select';
import { CreateGroupSavingsForm } from '../../components/types';
import { parseErrorsToMap } from '@/pages/auth/components/error';
import { CreateGroupSavingsGoalFormContext } from '../create-group-goal-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { DefaultGroupSavingsSteps, GroupSavingsType } from '../../lib/types';

export const subscriptionOptions = (isOpen: boolean) => [
  {
    label: (
      <div className="flex flex-col space-y-1">
        <p className="font-sans text-sm text-neutral-400 font-semibold">General - all members</p>
        {isOpen ? (
          <p className="font-sans-body text-xs text-neutral-400">Members are added to this goal automatically.</p>
        ) : null}
      </div>
    ),
    value: 'general',
  },
  {
    label: (
      <div className="flex flex-col space-y-1">
        <p className="font-sans text-sm text-neutral-400 font-semibold">Optional - opt to join</p>
        {isOpen ? (
          <p className="font-sans-body text-xs text-neutral-400">
            Members can decide whether to join this goal or not.
          </p>
        ) : null}
      </div>
    ),
    value: 'custom',
  },
];

export const SavingGoalTypes = [
  {
    label: 'Contributions',
    value: 'Contributions',
  },
  {
    label: 'Business',
    value: 'Business',
  },
  {
    label: 'Family',
    value: 'Family',
  },
  {
    label: 'Birthdays',
    value: 'Birthdays',
  },
  {
    label: 'Others',
    value: 'Others',
  },
];

export const GroupGoalDetailsSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  amountToSave: yup.string().required('This field cannot be left empty'),
  accountType: yup.string().required('This is a required field'),
  subscriptionType: yup.string().required('This is a required field'),
  signatories: yup.number().required('This is a required field'),
});

export const DefaultSavingDetails = () => {
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

  if (form?.nature !== GroupSavingsType.DEFAULT || step !== DefaultGroupSavingsSteps.SAVING_GOALS_DETAILS) {
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
          value={form?.accountType}
          placeholder="eg. Rent,wedding"
          error={errors?.accountType}
          onChange={(event) => {
            setValue('accountType', event.target.value);
            clearError('accountType');
          }}
          options={SavingGoalTypes}
        />

        <div className="flex lg:flex-row flex-col lg:space-x-3 space-y-7 lg:space-y-0">
          <div className="w-full lg:w-1/2">
            <Select
              label="Membership subscription type"
              value={form.subscriptionType}
              error={errors?.subscriptionType}
              subLabel="Select how you want members of your group to join this goal"
              options={subscriptionOptions}
              onChange={(event) => {
                setValue('subscriptionType', event.target.value);
                clearError('subscriptionType');
              }}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <Input
              type="number"
              label=" Number of signatories"
              error={errors?.signatories}
              subLabel="Number of people to approve withdrawals"
              onChange={(event) => {
                setValue('signatories', event.target.value);
                clearError('signatories');
              }}
            />
          </div>
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
          setErrors({});
        }}
      />

      <Spacer className="h-10" />
    </div>
  );
};
