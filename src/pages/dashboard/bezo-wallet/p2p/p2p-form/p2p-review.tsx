import { Spacer } from '@/components/spacer';
import { P2pSteps } from '../../lib/types';
import { useP2pContext } from '../p2p-context';
import { SelectedName } from '../selected-name';

export const P2pReviews = () => {
  const { step, form } = useP2pContext();

  if (step !== P2pSteps.REVIEW) {
    return null;
  }

  // const totalDebit = (parseFloat(form?.amount!) + (0.5 / 100) * parseFloat(form?.amount!)).toFixed(2);

  return (
    <div className="border-b-2 border-neutral-100 px-7">
      <Spacer className="h-8" />

      <div className="flex flex-col bg-[#E6E9F6] rounded-lg items-start justify-start px-7 lg:w-[350px]">
        <Spacer className="h-6" />

        <p className="font-sans text-neutral-400 text-sm">You are about to send</p>

        <Spacer className="h-4" />

        <div className="h-1 w-full border-t-2 border-dashed border-[#808192] border-opacity-75"></div>

        <Spacer className="h-4" />

        <p className="font-sans text-[#000] font-semibold text-lg">GHS {form?.amount}</p>

        <Spacer className="h-6" />

        <p className="font-sans text-[#091E42] text-opacity-40 text-sm font-medium">to</p>

        <Spacer className="h-4" />

        <div className="flex">
          <SelectedName noBg p2pProfile={form} />
        </div>

        <p className="text-neutral-400 text-sm ">{form?.fullName}</p>

        <Spacer className="h-4" />

        <div className="h-1 w-full border-t-2 border-dashed border-[#808192] border-opacity-75"></div>
        <Spacer className="h-8" />
      </div>

      <Spacer className="h-6" />

      <div className="bg-[#D9D9D9] bg-opacity-[38%] pl-3 py-1 rounded-full text-left">
        <p className="font-sans text-opacity-40 text-sm">Charges and commission</p>
      </div>

      <Spacer className="h-5" />

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-between  w-full">
          <p className="font-sans text-opacity-40 text-sm ">E-levy charge</p>
          <p className="font-sans text-opacity-40 text-sm ">GHS 00.00</p>
        </div>

        <Spacer className="h-3" />

        <div className="flex items-center justify-between  w-full">
          <p className="font-sans text-opacity-40 text-sm ">BezoSusu charge</p>
          <p className="font-sans text-opacity-40 text-sm ">GHS 00.00</p>
        </div>

        <Spacer className="h-3" />

        <div className="h-[1px] bg-[#808192] bg-opacity-75 w-full rounded-full"></div>

        <Spacer className="h-3" />

        <div className="flex items-center justify-between  w-full">
          <p className="font-sans text-opacity-40 text-sm ">Total debit</p>
          <p className="font-sans text-opacity-40 text-sm ">GHS {form?.amount}</p>
        </div>
      </div>

      <Spacer className="h-6" />
    </div>
  );
};
