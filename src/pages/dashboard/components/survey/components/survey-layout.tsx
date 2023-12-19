import { Button } from '@/components/button';
import SvgClose from '@/components/icons/Close';
import SvgCloseIcon from '@/components/icons/CloseIcon';
import SvgCloseSmall from '@/components/icons/CloseSmall';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import { useState } from 'react';

interface SurveyProps {
  question?: string;
  actionClick?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  hideButton?: boolean;
  successModal?: boolean;
}

export const SurveyLayout: React.FC<SurveyProps> = ({
  question,
  actionClick,
  open,
  setOpen,
  children,
  disabled,
  loading,
  hideButton,
  successModal,
}) => {
  return (
    <Modal open={open} setOpen={setOpen} className="lg:w-[520px] max-w-[520px] rounded-xl ">
      <div className="rounded-xl border-2 border-[#F2ECF6] px-6 py-5">
        <div className="w-full relative">
          <button onClick={() => setOpen?.(false)} className="absolute right-0">
            <SvgCloseIcon />
          </button>
        </div>

        <Spacer className="h-5" />

        <div className="border-b-2 border-neutral-100">
          <p className="font-sans-body text-center">{question}</p>

          <Spacer className="h-5" />
        </div>

        <Spacer className="h-10" />

        {children}

        <Spacer className="h-8" />

        {hideButton ? null : (
          <div className="flex justify-center">
            <Button disabled={disabled} onClick={actionClick} loading={loading}>
              {successModal ? 'Close' : ' Next'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
