import { GroupGoalsData, SlotDetails, WithdrawalSlotProps } from '../types';
import { useEffect, useState } from 'react';
import { Spacer } from '@/components/spacer';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/spinner';
import { RequestMethod, useApi } from '@/helpers/api';
import { SlotsConfirmModal } from './slots-confirm-modal';
import { DateRangePicker } from '@/components/date-range-picker';
import { WithdrawalDateCard } from '../withdrawal-date-card';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { CreateSavingsGoalLayout } from '@/pages/dashboard/savings/components/create-savings-goal-layout';

export const WithdrawalSlots: React.FC<WithdrawalSlotProps> = ({
  open,
  setOpen,
  roatationalGoalDetails,
  fetchGoalDetails,
}) => {
  const params = useParams();
  const [openPayoutModal, setOpenPayoutModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotDetails>();
  const [goalDetails, setGoalDetails] = useState<GroupGoalsData>({});
  const { submit: fetchSavingGoalDetails, isLoading: isFetchingSavingGoalDetails } = useApi(
    `/group/saving-goals?id=${params.goalId}`,
    {
      onSuccess(response) {
        setGoalDetails(response.data?.data?.savingGoal);
      },
      method: RequestMethod.GET,
    }
  );

  useEffect(() => {
    if (params.goalId) {
      fetchSavingGoalDetails();
    }
  }, [params.goalId]);

  const renderWithdrawalSlots = (
    params.goalId ? goalDetails?.rotationalSlots : roatationalGoalDetails?.rotationalSlots
  )?.map((slot: SlotDetails, idx: any) => {
    return (
      <WithdrawalDateCard
        key={idx}
        onClick={
          params.goalId
            ? () => {}
            : () => {
                setOpenPayoutModal(true);
                setSelectedSlot(slot);
              }
        }
        slotDetails={slot}
      />
    );
  });

  return (
    <>
      <SlotsConfirmModal
        open={openPayoutModal}
        setOpen={setOpenPayoutModal}
        selectedSlot={selectedSlot}
        closeMainModal={fetchGoalDetails}
      />

      <CreateSavingsGoalLayout
        title="Select Withdrawal Slot"
        open={open}
        closeModal={() => {
          setOpen!(false);
        }}
      >
        <div>
          <Spacer className="h-12" />

          <div className="grid lg:grid-cols-2 gap-3 lg:gap-0 items-center">
            <p className="font-sans text-[#000]">Filter by date range</p>

            <DateRangePicker className="w-full" />
          </div>

          <Spacer className="h-8" />

          {isFetchingSavingGoalDetails && params.goalId ? (
            <div className="w-full h-80 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full grid lg:grid-cols-4 grid-cols-1">{renderWithdrawalSlots}</div>
          )}

          <Spacer className="h-20" />

          <ActionButtons hideCancel onNext={() => {}} />
        </div>
      </CreateSavingsGoalLayout>
    </>
  );
};
