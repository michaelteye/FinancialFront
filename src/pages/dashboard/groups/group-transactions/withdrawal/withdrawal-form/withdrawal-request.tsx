import { Spacer } from '@/components/spacer';
import SvgWithdrawalReceipt from '@/components/icons/WithdrawalReceipt';
import SvgWarningCircle from '@/components/icons/WarningCircle';
import { useWithdrawalContext } from '../withdrawal-context';
import { GroupGoalsData } from '../../../components/types';
import { differenceInCalendarDays } from 'date-fns';
import { withdrawalSteps } from '../../../lib/types';

export const WithdrawalRequest: React.FC<{ goalData?: GroupGoalsData }> = ({ goalData }) => {
  const { step, setPinStep } = useWithdrawalContext();

  const daysLeft = differenceInCalendarDays(new Date(), new Date());

  if (step !== withdrawalSteps.WITHDRAWAL_REQUEST || setPinStep) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center px-7 border-b border-b-neutral-200">
        <SvgWithdrawalReceipt />

        <Spacer className="h-3" />

        <p className="font-sans font-medium text-sm text-[#3B6096]">{goalData?.nature} saving goal</p>

        <Spacer className="h-4" />

        <p className="font-sans font-medium text-[#000]">
          {goalData?.nature === 'SplitAndShare'
            ? 'With Split and Share Goal, every member recieves the exact amount they contributed. Hence as an admin, by initiating this withdrawal, each member shall recieve the money they contributed'
            : 'As an admin you can initate a withdrawal, but you need the approval of all signatories of the saving goal to approve of the withdrawal before funds are payed out to your primary wallet.'}
        </p>

        <Spacer className="h-3" />

        <div className="p-3 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
          <div>
            <SvgWarningCircle className="text-yellow" />
          </div>

          <p className="font-sans-body font-semibold lg:text-sm text-xs text-neutral-400 text-left">
            You'll be charged 1% for early withdrawals
          </p>
        </div>

        <Spacer className="h-8" />
      </div>
    </>
  );
};
