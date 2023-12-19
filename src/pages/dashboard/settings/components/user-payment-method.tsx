import { Button } from '@/components/button';
import SvgEdit from '@/components/icons/Edit';
import { Spacer } from '@/components/spacer';
import { PaymentMethodProps } from '../lib/types';
import { maskedDisplayPhoneNum } from '../../savings/helpers';
import { getImageFromNetwork, resolvePaymentType } from '../lib/index.t';

export const UserPaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, onClick }) => {
  const phoneNumberMask = maskedDisplayPhoneNum(paymentMethod?.phoneNumber!);

  return (
    <>
      <div className=" rounded-xl min-h-72 border border-neutral-100 bg-[#F5F8F9] p-4 addedPaymentMethod">
        <div className="flex justify-between items-center">
          <img
            className="w-12"
            alt={`${paymentMethod?.network}`}
            src={getImageFromNetwork(paymentMethod?.network?.toLowerCase())}
          />

          {paymentMethod?.default && (
            <span className="text-white text-sm bg-neutral-400 px-2 py-1 rounded-lg">Default</span>
          )}
        </div>

        <Spacer className=" h-6" />

        <div className=" flex flex-col space-y-3">
          <p className=" text-neutral-400 font-sans text-lg font-medium ">{paymentMethod?.network.toUpperCase()}</p>
          <p className=" text-neutral-400 font-sans font-medium capitalize">
            {resolvePaymentType(paymentMethod?.paymentType)}
          </p>
          <p className=" text-neutral-400 font-sans text-2xl font-medium">{phoneNumberMask}</p>
        </div>

        <Spacer className=" h-6" />

        <Button onClick={onClick} className="bg-white sm:px-3 sm:py-2 block" variant="secondary">
          <span className="flex space-x-2">
            <SvgEdit />
            <p className="text-sm text-neutral-700 font-sans">Edit</p>
          </span>
        </Button>
      </div>
    </>
  );
};
