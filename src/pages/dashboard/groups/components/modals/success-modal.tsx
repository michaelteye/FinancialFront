import SvgSuccess from '@/components/icons/Success';
import React from 'react';
import { GroupModalLayout } from './modal-layout';

export const SuccessModal: React.FC<{
  open?: boolean;
  setOpen?: (open: boolean) => void;
  text?: string | JSX.Element;
  action?: string;
  actionClick?: () => void;
}> = ({ open, setOpen, text, action = 'Yes, decline', actionClick }) => {
  return (
    <GroupModalLayout
      open={open}
      setOpen={setOpen}
      icon={SvgSuccess}
      action2="Not Now"
      action="View group(s) Invite"
      actionClick={actionClick}
      headerText={<p className="font-sans-body text-neutral-400 font-semibold">1 Pending group invitation</p>}
    >
      <p className="text-[#252525] font-sans-body text-center px-7">{text}</p>
    </GroupModalLayout>
  );
};
