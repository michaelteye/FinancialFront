import React from 'react';

export const TransactionType: React.FC<{ TransactionType?: string; reference?: string }> = ({
  TransactionType,
  reference,
}) => {
  return (
    <div className=" w-full flex flex-col">
      <p className=" font-sans font-semibold text-[#000] capitalize">{TransactionType}</p>
      <p className=" font-sans-body text-[#000] text-sm">#Ref: {reference}</p>
    </div>
  );
};
