import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Spacer } from '@/components/spacer';
import Modal from '@/components/modal/modal';
import { Button } from '@/components/button';
import SvgSuccessPin from '@/components/icons/SuccessPin';
import { SavingsOperations } from '../../savings/savings-transactions/topup-withdraw-savings/operations-setup';
import useGoals from '@/hooks/fetch-goal';

export const BezoPinSuccess: React.FC<{
  openSuccessPinModal: boolean;
  setOpenSuccessPinModal: (openSuccessPinModal: boolean) => void;
}> = ({ openSuccessPinModal, setOpenSuccessPinModal }) => {
  const { goals } = useGoals();
  const [openSavingsOperationsModal, setOpenSavingsOperationsModal] = useState(false);

  return (
    <>
      <SavingsOperations
        open={openSavingsOperationsModal}
        setOpen={setOpenSavingsOperationsModal}
        savingGoals={goals}
      />

      <Modal
        className="lg:w-[44rem] max-w-[44rem] rounded-2xl"
        open={openSuccessPinModal}
        setOpen={setOpenSuccessPinModal}
      >
        <div className=" flex flex-col items-center py-14">
          <SvgSuccessPin />

          <Spacer className=" h-2" />

          <div className=" flex flex-col items-center">
            <p className=" text-3xl font-sans text-neutral-400 font-extrabold">Your Bezo PIN has been set.</p>

            <Spacer className=" h-2" />

            <p className=" text-neutral-400 font-sans-body">You can reset or change your Bezo PIN in your settings.</p>
          </div>

          <Spacer className=" h-6" />

          <div>
            <Button
              onClick={() => {
                setOpenSavingsOperationsModal(true);
                setOpenSuccessPinModal(false);
              }}
              variant="primary"
            >
              Go to homepage
            </Button>
          </div>
        </div>

        <Spacer className=" h-10" />
      </Modal>
    </>
  );
};
