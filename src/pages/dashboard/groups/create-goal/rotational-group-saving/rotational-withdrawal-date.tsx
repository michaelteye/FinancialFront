import { DateRangePicker } from '@/components/date-range-picker';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { RequestMethod, useApi } from '@/helpers/api';
import { ActionButtons } from '@/pages/dashboard/savings/components/action-buttons';
import { useContext, useEffect, useState } from 'react';
import { SlotsConfirmModal } from '../../components/modals/slots-confirm-modal';
import { GroupGoalsData, SlotDetails } from '../../components/types';
import { GroupSavingsType, RotationalGroupSavingsSteps } from '../../lib/types';
import { WithdrawalDateCard } from './../../components/withdrawal-date-card';
import { CreateGroupSavingsGoalFormContext } from './../create-group-goal-context';

export const RotationalPickWithdrawalDate: React.FC<{ closeModal?: () => void }> = ({ closeModal }) => {
  const [openPayoutModal, setOpenPayoutModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotDetails>();
  const [goalDetails, setGoalDetails] = useState<GroupGoalsData>({});
  const { step, showPrevStep, showNextStep, form } = useContext(CreateGroupSavingsGoalFormContext);
  const { submit: fetchSavingGoalDetails, isLoading: isFetchingSavingGoalDetails } = useApi(
    `/group/saving-goals?id=${form?.rotationalRefId}`,
    {
      onSuccess(response) {
        setGoalDetails(response.data?.data?.savingGoal);
      },
      method: RequestMethod.GET,
    }
  );

  useEffect(() => {
    if (form?.rotationalRefId) {
      fetchSavingGoalDetails();
    }
  }, [form?.rotationalRefId]);

  const renderWithdrawalSlots = goalDetails.rotationalSlots?.map((slot: SlotDetails, idx: any) => {
    return (
      <WithdrawalDateCard
        key={idx}
        onClick={() => {
          setOpenPayoutModal(true);
          setSelectedSlot(slot);
        }}
        slotDetails={slot}
      />
    );
  });

  if (step !== RotationalGroupSavingsSteps.SELECT_WITHDRAWAL_DATE || form?.nature !== GroupSavingsType.ROTATIONAL) {
    return null;
  }

  return (
    <>
      <SlotsConfirmModal
        open={openPayoutModal}
        setOpen={setOpenPayoutModal}
        selectedSlot={selectedSlot}
        closeMainModal={closeModal}
      />
      <div>
        <h1 className="  font-sans font-medium text-3xl text-neutral-900 leading-[50px]">Select a withdrawal date</h1>

        <Spacer className="h-4" />
        <div className="grid lg:grid-cols-2 gap-3 lg:gap-0 items-center">
          <p className="font-sans text-[#000]">Filter by date range</p>

          <DateRangePicker className="w-full" />
        </div>

        <Spacer className="h-8" />

        {isFetchingSavingGoalDetails ? (
          <div className="w-full flex justify-center my-6">
            <Spinner />
          </div>
        ) : (
          <div className="w-full grid lg:grid-cols-4 grid-cols-1">{renderWithdrawalSlots}</div>
        )}

        <Spacer className="h-20" />

        <ActionButtons
          hideCancel
          onNext={() => {
            showNextStep();
          }}
        />
      </div>
    </>
  );
};
