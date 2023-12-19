import React from 'react';
import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';

export const Loading: React.FC = () => {
  return (
    <div>
      <Spacer className="h-16" />
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
      <Spacer className="h-6" />
      <div className="w-full">
        <h2 className="text-center font-sans sm:text-2xl text-xl text-neutral-500">Adding Payment Method...</h2>

        <Spacer className="h-2" />

        <p className="text-sm text-neutral-800">Please wait!</p>
      </div>

      <Spacer className="h-12" />
    </div>
  );
};
