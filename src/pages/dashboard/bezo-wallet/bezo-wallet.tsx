import { Arrow } from '@/components/icons';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { useAuthStore } from '@/store/auth';
import { Title } from '../components/title';
import { useNavigate } from 'react-router-dom';
import useGoals from '@/hooks/fetch-goal';
import { BezoTransactions } from './bezo-transactions';
import { TopupWithdrawButtons } from '../savings/components/action-buttons';

export const BezoWallet = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  const { isFetchingUserSavingsGoals } = useGoals();
  const balance = userProfile?.balance!;

  return (
    <>
      {isFetchingUserSavingsGoals ? (
        <div className="flex h-screen justify-center items-center my-auto">
          <Spinner />
        </div>
      ) : (
        <>
          <Title title={`My BezoWallet`} />


          <Spacer className="h-6" />

          <p className="font-sans text-sm text-[#5B5B5B] font-medium">
            Your BezoWallet is your primary wallet where you can deposit money and use for various transactions.
          </p>

          <Spacer className="h-6" />

          <div
            style={{ boxShadow: '2px 1px 2px rgba(0, 0, 0, 0.08)' }}
            className="flex lg:flex-row flex-col lg:space-y-0 space-y-4 justify-between w-full border-2 border-[#F3F2F8] bg-[#F3F2F8] bg-opacity-20 px-8 py-4 rounded-lg"
          >
            <div className="flex flex-col">
              <p className="font-sans text-neutral-400">Introducing usernames ✨ </p>

              <Spacer className="h-3"/>

              <div>
                <p className="font-sans text-xs text-[#7A85A7] text-opacity-[58%]">Your username</p>
                <p className="font-sans text-[#7A85A7] font-semibold">@{userProfile?.user?.userName}</p>
              </div>             
            </div>

            <button
              onClick={() => navigate('/dashboard/settings')}
              className="flex items-center space-x-2 transition transform hover:translate-x-2">
              <p className="font-sans">Change username</p>
              <Arrow />
            </button>
          </div>

          <div>
            <Spacer className="h-6" />
          </div>

          <Spacer className="h-6" />

          <div className="flex lg:flex-row flex-col-reverse lg:space-y-0 lg:justify-between w-full">
            <div className="flex flex-col justify-start">
              <div
                className={`px-5 py-10 flex flex-col text-left lg:w-[450px] w-full h-[180px] lg:pr-4 rounded-xl hover:shadow-md transition duration-75 ease-linear bezoWallet relative`}
              >
                <p className="text-white text-xs">Balance</p>
                <p className="text-white font-sans text-lg font-bold">
                  GHS {balance ? parseFloat(balance).toFixed(2) : '0.00'}
                </p>

                <p className="text-white text-xs absolute right-6 bottom-6">
                  Wallet ID: {userProfile?.account?.accountNumber}
                </p>
              </div>

              <Spacer className="h-8" />

              <div className="flex flex-col">
                <p className="font-sans text-[#5B5B5B] text-sm">Here’s more actions you can do with BezoWallet</p>

                <Spacer className="h-4" />

                <div className="">
                  <TopupWithdrawButtons bezoWalletFund />
                </div>
              </div>
            </div>

            <Spacer className="h-3 lg:hidden" />

            <div>
              <TopupWithdrawButtons />
            </div>
          </div>

          <Spacer className="lg:h-16 h-10" />

          <BezoTransactions />
        </>
      )}
    </>
  );
};
