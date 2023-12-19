import { ActionModal } from '@/components/modal/action-modal';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import React from 'react';

export const InvestLoading: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <ActionModal open={open}>
      <div>
        <Spacer className="h-16" />
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
        <Spacer className="h-6" />
        <div className="w-full">
          <h2 className="text-center font-sans text-2xl text-neutral-500">Processing payment...</h2>

          <Spacer className="h-2" />

          <p className="text-sm text-neutral-800">Processing your payment. This will take a few seconds</p>
        </div>

        <Spacer className="h-12" />
      </div>
    </ActionModal>
  );
};
