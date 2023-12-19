import SvgSuccess from '@/components/icons/Success';
import { Spacer } from '@/components/spacer';
import { VasSteps } from '../lib/types';
import { useVasContext } from './vas-context';

export const VasSuccess = () => {
  const { step, form, selectedBiller } = useVasContext();

  if (step !== VasSteps.SUCCESS) {
    return null;
  }

  return (
    <div className="rounded-2xl flex flex-col w-full">
      <div className="rounded-t-2xl flex flex-col items-center bg-neutral-100 bg-opacity-60 py-9 relative">
        <div className="rounded-2xl">
          <div className=" flex flex-col items-center">
            <SvgSuccess />
            <p className=" text-success-300 font-sans font-semibold text-3xl">Hurray</p>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-100 flex justify-center p-9">
        <p className=" font-sans-body text-[#252525] text-center">
          Your {selectedBiller?.category.toLowerCase()} of GHS {form?.amount} was successfully processed.
        </p>
      </div>

      <Spacer className="h-4" />
    </div>
  );
};
