import { Spacer } from '@/components/spacer';
import { Spinner } from '@/components/spinner';
import { DefaultIcon } from './dropdown';
import { RequestMethod, useApi } from '@/helpers/api';
import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewUserProfile } from '@/store/types';
import { SlotDetails } from './types';

export const WithdrawalDateCard: React.FC<{ slotDetails?: SlotDetails; onClick?: () => void }> = ({
  onClick,
  slotDetails,
}) => {
  const params = useParams();
  const [userDetails, setUserDetails] = useState<NewUserProfile>();
  const { submit: fetchUserProfile, isLoading: isFetchingUserProfile } = useApi(`/users?user=${slotDetails?.user_id}`, {
    onSuccess(response) {
      setUserDetails(response?.data?.data?.user);
    },
    method: RequestMethod.GET,
  });

  const available = slotDetails?.status === 'available';

  useEffect(() => {
    if (slotDetails?.user_id) {
      fetchUserProfile();
    }
  }, []);

  return (
    <button
      onClick={() => {
        if (available) {
          onClick?.();
        }
        return;
      }}
      className={classNames(
        'flex flex-col justify-start space-y-2 p-4 bg-[#ECF1F466] bg-opacity-40 border border-dashed border-[#C6D5DE]',
        {
          'hover:bg-[#5E74DF1A] hover:bg-opacity-1': !params.goalId,
          'bg-[#5E74DF1A]': !available,
        }
      )}
    >
      {isFetchingUserProfile ? (
        <div className="w-full flex items-center justify-center my-auto h-1/2">
          <Spinner />
        </div>
      ) : (
        <>
          {available ? (
            <div className="rounded-full bg-neutral-200 w-10 h-10"></div>
          ) : userDetails?.user?.profilePic ? (
            <img className="rounded-full w-10 h-10" src={userDetails?.user?.profilePic} alt="user profile picture" />
          ) : (
            <DefaultIcon name={userDetails?.user?.firstName} />
          )}

          <p
            className={classNames('font-sans text-sm text-opacity-60 text-left', {
              'text-neutral-400  text-opacity-60': available,
            })}
          >
            {available ? 'Click to get assigned to this slot' : <p className="my-2">{userDetails?.user?.firstName}</p>}
          </p>

          <p className="font-semibold text-sm text-neutral-400">
            {slotDetails ? format(new Date(slotDetails?.payoutDate!), 'eee, dd-MM-yyyy') : ''}
          </p>

          {available ? null : <Spacer className="" />}

          <div
            className={classNames('rounded-3xl bg-teal p-1 text-white', {
              'bg-neutral-300 px-2 py-1 text-[#000]': !available,
            })}
          >
            {available ? 'Slot is available' : 'Taken'}
          </div>
        </>
      )}
    </button>
  );
};
