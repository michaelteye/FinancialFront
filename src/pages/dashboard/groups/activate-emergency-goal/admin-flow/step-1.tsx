import { Spacer } from '@/components/spacer';
import { activateSteps, useActivateContext } from '../activate-context';
import notAvalaibleImg from '@assets/images/dashboard-images/not-activated.jpg';

export const Step1 = () => {
  const { step } = useActivateContext();

  if (step !== activateSteps.STEP_1) {
    return null;
  }
  return (
    <div className="flex flex-col px-7 justify-center items-center border-b border-neutral-100">
      <Spacer className="h-4" />

      <p className="font-sans text-sm font-semibold text-neutral-400">Save for the rainy day</p>

      <Spacer className="h-5" />

      <div>
        <img src={notAvalaibleImg} />
      </div>

      <Spacer className="h-3" />

      <p className="font-sans text-sm font-semibold text-neutral-400">
        Now you and your susu members can now save ahead of unforseen events
      </p>

      <Spacer className="h-6" />
    </div>
  );
};
