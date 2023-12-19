import { Spacer } from '@/components/spacer';
import { Input } from '@/components/input/input';
import { useWithdrawalContext } from '../withdrawal-context';
import { withdrawalSteps } from '../../../lib/types';

export const WithdrawalDetails: React.FC<{ goalNature?: string }> = ({ goalNature }) => {
  const { step, error, setError, setForm, form, setPinStep } = useWithdrawalContext();

  if (step !== withdrawalSteps.WITHDRAWAL_DETAILS || goalNature === 'SplitAndShare' || setPinStep) {
    return null;
  }

  return (
    <>
      <Spacer className="h-6" />

      <div className="px-7 flex flex-col text-left border-b border-neutral-200">
        <Input
          label="Amount request"
          error={error}
          disabled={goalNature === 'Default'}
          prefix="GHS"
          placeholder="eg. 200"
          onChange={(event) => {
            const inputValue = event?.target?.value;
            if (inputValue.includes('.')) {
              const [firstValue, secondValue] = inputValue.split('.');
              if (secondValue.length > 2) {
                return inputValue;
              }
            }
            if (parseFloat(inputValue) <= 0 || isNaN(parseFloat(inputValue))) {
              setError?.('Invalid Amount');
            } else {
              setError?.(undefined);
            }
            setForm?.({ ...form, amount: inputValue });
          }}
        />

        {goalNature === 'Default' ? (
          <div>
            <p className="font-sans-body text-[#EC9E00] text-left">All the money contributed shall be withdrawn</p>
          </div>
        ) : null}
        <Spacer className="h-8" />

        <Input
          label="Withdrawal purpose"
          placeholder="e.g end of goal withdrawal, emergency withdrawal."
          onChange={(event) => {
            setForm({ ...form, reason: event.target.value });
          }}
        />

        <Spacer className="h-10" />
      </div>
    </>
  );
};
