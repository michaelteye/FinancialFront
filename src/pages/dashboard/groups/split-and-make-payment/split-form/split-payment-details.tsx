import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { useContext, useState } from 'react';
import { Select } from '@/components/input/select';
import { useMessagesStore } from '@/store/messages';
import { CreateSplitFormContext } from '../split-context';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { CreateSplitFormSteps } from '../../lib/types';

export const SplitPayCategories = [
  {
    label: 'Transportation',
    value: 'Transportation',
  },
  {
    label: 'Food',
    value: 'Food',
  },
  {
    label: 'Fees',
    value: 'Fees',
  },
  {
    label: 'Electronics',
    value: 'Electronics',
  },
  {
    label: 'Furniture',
    value: 'Furniture',
  },
  {
    label: 'Others',
    value: 'Others',
  },
];

export const SplitPayPaymentOccurence = [
  {
    label: 'One-time payment',
    value: 'One-time payment',
  },
  {
    label: 'Re-occuring payment',
    value: 'Re-occuring payment',
  },
];

export const SplitPayPaymentFrequency = [
  {
    label: 'Daily',
    value: 'Daily',
  },
  {
    label: 'Weekly',
    value: 'Weekly',
  },
  {
    label: 'Monthly ',
    value: 'Monthly ',
  },
];
interface SplitPaymentDetailsProps {
  setOpenSuccessmodal: (open: boolean) => void;
}

export const SplitPaymentDetails: React.FC<SplitPaymentDetailsProps> = ({ setOpenSuccessmodal }) => {
  const { displayMessage } = useMessagesStore();
  const [makeInputText, setMakeInputText] = useState(false);
  const { step, showPrevStep } = useContext(CreateSplitFormContext);

  return (
    <>
      <div
        className={classNames('', {
          hidden: step !== CreateSplitFormSteps.STEP_2,
          '': step === CreateSplitFormSteps.STEP_2,
        })}
      >
        <h1 className="font-sans font-medium text-3xl text-neutral-900 leading-[50px] mb-1">Create a split payment</h1>

        <Spacer className="h-2" />

        <h1 className="font-sans-body text-[#000]">Please select the right details that apply to your payment</h1>

        <Spacer className="h-9" />

        <Select label="Expense Category" placeholder="Select an expense category" options={SplitPayCategories} />

        <Spacer className="h-8" />

        <Select label="Payment occurance" placeholder="Select a payment occurance" options={SplitPayPaymentOccurence} />

        <Spacer className="h-8" />

        <Select label="How often do you want make this payment?" options={SplitPayPaymentFrequency} />

        <Spacer className="h-10" />

        <ActionButtons
          onPrevious={() => {
            showPrevStep();
          }}
          onNext={() => {
            setOpenSuccessmodal(true);
          }}
        />
      </div>
    </>
  );
};
