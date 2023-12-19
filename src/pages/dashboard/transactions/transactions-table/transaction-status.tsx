import React from 'react';
import classnames from 'classnames';

export const TransactionStatus: React.FC<{
  state?: 'pending' | 'successful' | 'failure' | 'success';
  small?: boolean;
}> = ({ state, small }) => {
  const isPending = state === 'pending';
  const isSuccess = state === 'successful' || state === 'success';

  return (
    <div
      className={classnames(
        'w-full flex items-center justify-center rounded-[50px] bg-opacity-20 font-sans font-medium text-xs',
        {
          'px-12 py-3 ': !small,
          'px-4 py-2': small,
          ' bg-yellow text-yellow': isPending,
          ' bg-[#6FCF97] text-[#219653] bg-opacity': isSuccess,
          ' bg-secondary-200 text-secondary-200': !isSuccess && !isPending,
        }
      )}
    >
      {isSuccess ? 'success' : null}
      {isPending ? 'pending' : null}
      {!isSuccess && !isPending ? 'failed' : null}
    </div>
  );
};
