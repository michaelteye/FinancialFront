import React, { useState } from 'react';
import { Spacer } from '@/components/spacer';
import SvgSuccess from '@/components/icons/Success';
import { CreateSavingsGoalLayout } from '../../savings/components/create-savings-goal-layout';
import { GroupModalLayout } from '../components/modals/modal-layout';
import { CreateSplitFormContext } from './split-context';
import { CreateGoalProgressBar } from '../components/progress-bar';
import { AboutSplitPayment } from './split-form/about-split-pay';
import { SplitPaymentDetails } from './split-form/split-payment-details';
import { CreateSplitForm, CreateSplitFormSteps } from '../lib/types';

export const CreateSplitPay: React.FC<{ open?: boolean; setOpen?: (open: boolean) => void }> = ({ open, setOpen }) => {
  const [step, setStep] = useState(CreateSplitFormSteps.STEP_1);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [form, setForm] = useState<CreateSplitForm>({});

  const setValue = (key: keyof CreateSplitForm, value: any) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const showNextStep = () => {
    {
      step < 2 ? setStep((currentStep) => currentStep + 1) : null;
    }
  };
  const showPrevStep = () => {
    setStep((previouStep) => previouStep - 1);
  };

  return (
    <>
      <GroupModalLayout
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        icon={SvgSuccess}
        cancelAction={() => {
          setStep(CreateSplitFormSteps.STEP_1);
        }}
        action="Pay your contribution"
        action2="Skip this will do this later"
        headerText={
          <div className="flex flex-col space-x-4">
            <p className="font-sans text-3xl text-green font-semibold">Hurray!</p>
            <p className="font-sans-body text-neutral-400 font-semibold">Your split payment has been created</p>
          </div>
        }
      >
        <p className="text-[#252525] font-sans-body text-center px-7">
          Together with your friends, you can make split payment for this event.
        </p>
      </GroupModalLayout>

      <CreateSplitFormContext.Provider
        value={{
          step,
          setStep,
          form,
          setForm,
          setValue,
          showNextStep,
          showPrevStep,
        }}
      >
        <CreateSavingsGoalLayout
          title="Create a saving group"
          open={open}
          closeModal={() => {
            setOpen!(false);
            setStep(CreateSplitFormSteps.STEP_1);
          }}
        >
          <Spacer className="h-12" />
          <CreateGoalProgressBar />
          <AboutSplitPayment />
          <SplitPaymentDetails
            setOpenSuccessmodal={() => {
              setOpen?.(false);
              setOpenSuccessModal(true);
            }}
          />
        </CreateSavingsGoalLayout>
      </CreateSplitFormContext.Provider>
    </>
  );
};
