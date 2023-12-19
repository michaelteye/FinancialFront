import SvgDanger from '@/components/icons/Danger';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PayoutModalProps } from '../types';
import { GroupModalLayout } from './modal-layout';

export const GoalVerificationModal: React.FC<PayoutModalProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <GroupModalLayout
        open={open}
        setOpen={setOpen}
        action="Okay"
        icon={SvgDanger}
        actionClick={() => navigate('/dashboard/groups/groupData/goalsId')}
      >
        <div className="flex flex-col space-y-3 justify-center items-center px-7">
          <p className="font-bold text-[#252525] text-3xl font-sans">Goal verification</p>
          <p className="text-[#252525] font-sans-body">
            Since this is an organizational goal, BezoSusu will have to verify this goal. It may take up to 48 hours.
          </p>
        </div>
      </GroupModalLayout>
    </>
  );
};
