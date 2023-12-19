import React from 'react';
import SvgWarningCircle from '@/components/icons/WarningCircle';
import { ActionModal } from '@/components/modal/action-modal';
import { Spacer } from '@/components/spacer';

export const NotActivated: React.FC<{ open?: boolean; setOpen?: (open: boolean) => void }> = ({ open, setOpen }) => {
  return (
    <ActionModal
      open={open}
      setOpen={setOpen}
      heading="Emergency goal"
      action="Close"
      hideCancel
      className="lg:w-[536px]"
      buttonposition="text-center"
      actionButtonProps={{
        className: 'text-center',
        onClick: () => {
          setOpen?.(false);
        },
      }}
    >
      <div className="px-7 border-b border-neutral-100">
        <div className="p-3 bg-yellow bg-opacity-10 rounded-xl flex space-x-3 items-center">
          <div>
            <SvgWarningCircle className="text-yellow" />
          </div>

          <p className="font-sans-body font-semibold lg:text-sm text-xs text-neutral-400 text-left">
            This goal has to be activated by your group admin in order for you to contribute to this goal
          </p>
        </div>

        <Spacer className="h-6" />
      </div>
    </ActionModal>
  );
};
