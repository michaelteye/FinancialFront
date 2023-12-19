import * as yup from 'yup';
import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { Notice } from '@/components/flash/flash';
import React, { useContext, useState } from 'react';
import { DropDown } from '../../components/dropdown';
import { CreateSplitFormContext } from '../split-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { CreateSplitFormSteps } from '../../lib/types';

export const testNames = ['KATI NEVILLE', 'KATI FRANTZ MIYERKELOS', 'KATI ALFRED', 'LOUIS KATI', 'BEATRICE YENUI'];

export const SplitPayDetailsSchema = yup.object().shape({
  goalName: yup.string().required('This field is required'),
  amountToSave: yup.string().required('This field cannot be left empty'),
  amountToRaise: yup.string().required('This field cannot be left empty'),
  subscriptionType: yup.string().required('This is a required field'),
});

export const AboutSplitPayment = () => {
  const { step, showNextStep } = useContext(CreateSplitFormContext);
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <>
      <div
        className={classNames({
          hidden: step !== CreateSplitFormSteps.STEP_1,
          '': step === CreateSplitFormSteps.STEP_1,
        })}
      >
        <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">Create a split payment</h1>
        <Spacer className="h-2" />

        <h1 className="font-sans-body text-[#000]">Please complete fields below to create a split payment.</h1>

        <Spacer className="h-7" />

        <Input label="What do you want to pay for?" placeholder="eg. Group day out food bill" />

        <Spacer className="h-7" />

        <Input label="How much does it cost?" placeholder="eg. 500" prefix="GHS" />

        <Spacer className="h-7" />

        <Input type="number" label="How many people are paying?" placeholder="eg. 500" />

        <Spacer className="h-2" />

        <Notice
          noIcon
          className="py-4 px-6"
          text={
            <span className="text-neutral-400 font-sans-body font-semibold">
              Each member of <span className="font-bold">“Group day out food bill”</span> will pay{' '}
              <span className="text-secondary-100">GHS 125.00 </span>
            </span>
          }
        />
        <Spacer className="h-7" />

        <DropDown
          open={showDropDown}
          setOpen={setShowDropDown}
          names={testNames}
          label="Invite members to make payment."
          subLabel="Input phone numbers of BezoMoney members to invite them to make payment."
        />

        <Spacer className="h-2" />

        <p className="font-sans text-sm text-neutral-400">You can skip this for now.</p>

        <ActionButtons hideCancel onNext={() => showNextStep()} />

        <Spacer className="h-10" />
      </div>
    </>
  );
};
