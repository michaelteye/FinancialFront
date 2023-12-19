import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import { ActionModal } from '@/components/modal/action-modal';
import firstTopup from '@assets/images/dashboard-images/first-topup.png';
import { SavingsOperations } from '../savings-transactions/topup-withdraw-savings/operations-setup';
import { SavingGoal } from '../helpers/types';
import { CONST } from '../../tools/constants';

export const FirstDeposit: React.FC<{ open?: boolean; setOpen?: (open: boolean) => void; savingGoals?: SavingGoal[] }> =
  ({ open, setOpen, savingGoals }) => {
    const { userProfile } = useAuthStore();
    const [openSavingsTopUp, setOpenSavingsTopUp] = useState(false);
    const firstName = userProfile?.user?.firstName!;

    return (
      <>
        <SavingsOperations open={openSavingsTopUp} setOpen={setOpenSavingsTopUp} savingGoals={savingGoals} />

        <ActionModal
          modalWidth="max-w-[500px]"
          open={open}
          setOpen={setOpen}
          hideCancel
          buttonposition="text-center"
          heading="Make your first Deposit ⚡️"
          action={`Deposit GHS ${CONST.INIT_DEPOSIT} `}
          actionButtonProps={{
            onClick: () => {
              setOpenSavingsTopUp(true);
              setOpen?.(false);
            },
          }}
        >
          <div className="flex flex-col justify-center items-center px-7 border-b-2 border-neutral-100">
            <div>
              <img src={firstTopup} />
            </div>

            <Spacer className="h-5" />

            <p className="font-sans text-sm text-neutral-400 px-12">
              Dear {firstName}, thank you for taking the first step to financial freedom. Go ahead and make your first
              deposit of <span className="font-bold">GHS {CONST.INIT_DEPOSIT}</span>
            </p>

            <Spacer className="h-5" />
          </div>
        </ActionModal>
      </>
    );
  };
