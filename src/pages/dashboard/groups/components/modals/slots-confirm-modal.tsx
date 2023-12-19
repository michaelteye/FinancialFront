import SvgDanger from '@/components/icons/Danger';
import { useApi } from '@/helpers/api';
import { useAuthStore } from '@/store/auth';
import { useMessagesStore } from '@/store/messages';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { PayoutModalProps } from '../types';
import { GroupModalLayout } from './modal-layout';

export const SlotsConfirmModal: React.FC<PayoutModalProps> = ({ open, setOpen, selectedSlot, closeMainModal }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { userProfile } = useAuthStore();
  const { displayMessage } = useMessagesStore();
  const { submit: setWithdrawalDate } = useApi('/group/goals/rotational/slots', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'You have Successfully set your Withdrawal date',
        variant: 'success',
      });
      navigate(`/dashboard/groups/${params.refId}/${selectedSlot?.goal_id}`);
      closeMainModal?.();
    },
  });

  function handleSubmit() {
    setWithdrawalDate({
      user: userProfile?.id,
      slot: selectedSlot?._id,
    });
  }

  return (
    <>
      <GroupModalLayout
        open={open}
        setOpen={setOpen}
        icon={SvgDanger}
        actionClick={() => {
          handleSubmit();
          setOpen?.(false);
        }}
      >
        <div className="flex flex-col space-y-3 justify-center items-center px-7">
          <p className="font-bold text-[#252525] text-3xl font-sans">Select payout slot?</p>

          <p className="text-[#252525] font-sans-body">
            Are you sure you want to select{' '}
            {selectedSlot ? format(new Date(selectedSlot?.payoutDate!), 'E, do MMM yyyy') : ''} as your payout date?{' '}
            <br />
            <span className="text-secondary-100 font-sans-body">Note you can’t change you slot if selected.</span>
          </p>
        </div>
      </GroupModalLayout>
    </>
  );
};
