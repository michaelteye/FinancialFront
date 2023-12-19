import { Spacer } from '@/components/spacer';
import { TopupWithdrawButtons } from '../../savings/components/action-buttons';
import homeTransactionsUrl from '@assets/images/dashboard-images/home-transactions.png';

export const NoTransactionsCard = () => {
  return (
    <div className="flex flex-col bg-[#F3F2F8] rounded-[10px] w-full bg-opacity-30 items-center ">
      <img src={homeTransactionsUrl} alt="Lady carrying Cash" />
      <p className=" font-bold font-sans-body text-sm text-[#000] leading-5 mt-3">You have no transactions yet</p>
      <p className=" font-sans-body text-sm text-[#000] text-center pt-1 mb-2">
        Deposit money into any <br /> of your saving goals
      </p>

      <Spacer className="h-2" />

      <TopupWithdrawButtons topUpChild="Deposit now!" removeIcon removeWithdraw noMobileChange />
    </div>
  );
};
