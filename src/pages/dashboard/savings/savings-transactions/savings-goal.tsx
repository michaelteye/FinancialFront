import { RadioInput } from '@/components/input/radio-input';
import { SavingGoal } from '../helpers/types';

export const SavingsGoal: React.FC<{ savingsGoal: SavingGoal; onChange?: (savingGoal: SavingGoal) => void }> = ({
  savingsGoal,
  onChange,
}) => {
  return (
    <RadioInput
      id={savingsGoal?.id}
      prefix={savingsGoal?.emoji}
      text={savingsGoal?.name}
      value={savingsGoal?.name}
      name="saving-goal"
      className=" bg-white rounded-none"
      onChange={() => {
        onChange?.(savingsGoal);
      }}
    />
  );
};
