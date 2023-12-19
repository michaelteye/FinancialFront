import { CloseGoal } from '@/components/icons';
import { ActionModal } from '@/components/modal/action-modal';
import { Spacer } from '@/components/spacer';
import { PaymentMethod } from '@/store/types';

interface DeletePaymentMethodProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClick: () => void;
  isLoading: boolean;
  paymentOption?: PaymentMethod;
}

const DeletePaymentMethod: React.FC<DeletePaymentMethodProps> = ({
  open,
  setOpen,
  onClick,
  isLoading,
  paymentOption,
}) => {
  return (
    <ActionModal
      open={open}
      setOpen={setOpen}
      modalWidth="lg:min-w-[33.2rem] w-[90vw]"
      hideCancel
      buttonposition="text-center"
      action="Yes, Delete"
      actionButtonProps={{
        onClick,
        loading: isLoading,
        className: 'bg-[#FF5029] hover:bg-[#FF5029] hover:bg-opacity-[0.85]',
      }}
      heading={
        <div className="flex items-center space-x-2">
          <CloseGoal />
          <p>Warning</p>
        </div>
      }
    >
      <Spacer className="h-5" />

      <Spacer className="h-5" />

      <div className="flex flex-col space-y-4 px-7 border-b border-neutral-100">
        <p className="text-neutral-400 font-sans font-medium">
          Are you sure you want to remove {paymentOption?.phoneNumber} from your payment options?
        </p>

        <p className="text-neutral-400 font-sans text-sm font-medium text-center">
          This action is irreversible and the method will be deleted from your BezoSusu account.
        </p>

        <Spacer className="h-5" />
      </div>
    </ActionModal>
  );
};

export default DeletePaymentMethod;
