import React from 'react';
import SvgDeclined from '@/components/icons/Declined';
import { GroupModalLayout } from './modal-layout';

export const DeleteModal: React.FC<{
  open?: boolean;
  setOpen?: (open: boolean) => void;
  text?: string | JSX.Element;
  hideCancel?: boolean;
  action?: string;
  isLoading?: boolean;
  actionClick?: () => void;
}> = ({ open, setOpen, text, action = 'Yes, decline', actionClick, isLoading, hideCancel }) => {
  return (
    <>
      <GroupModalLayout
        open={open}
        setOpen={setOpen}
        icon={SvgDeclined}
        action={action}
        isLoading={isLoading}
        hideCancel={hideCancel}
        actionClick={actionClick}
        bgColorStyle="bg-secondary-200 hover:bg-secondary-200 hover:bg-opacity-80"
        headerText={<p className="font-sans-body text-neutral-400 font-semibold">Are you sure!</p>}
      >
        <p className="text-[#252525] font-sans-body text-center px-7">{text}</p>
      </GroupModalLayout>
    </>
  );
};
