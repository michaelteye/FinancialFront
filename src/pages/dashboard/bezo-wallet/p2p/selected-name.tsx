import React from 'react';
import classNames from 'classnames';
import { NewUserProfile } from '@/store/types';

interface DefaultIconProps {
  name?: string;
  className?: string;
}

export const DefaultIcon: React.FC<DefaultIconProps> = ({ name = '', className = 'w-10 h-10 text-lg' }) => {
  const names = name?.split(' ');
  const firstInitials = names?.[0]?.substring(0, 1);
  const secondInitials = names?.[1]?.substring(0, 1);

  const initials = firstInitials! + secondInitials!;

  return (
    <div
      className={`flex items-center justify-center rounded-full font-medium text-white bg-neutral-400 capitalize ${className}`}
    >
      {initials}
    </div>
  );
};

export const SelectedName: React.FC<{
  onClose?: () => void;
  noIcon?: boolean;
  sameUser?: boolean;
  p2pProfile?: NewUserProfile;
  noBg?: boolean;
}> = ({ onClose, noIcon, p2pProfile, sameUser, noBg }) => {
  //@ts-ignore
  const profileFiles = p2pProfile?.files?.filter((file) => file?.appType === 'PROFILE' && file.idType === 'NONE');

  const userProfilePic = profileFiles?.[0]?.url[0];

  return (
    <div
      className={classNames(
        'w-full py-3 flex items-center justify-center mx-auto text-sm list-none rounded-lg mr-2 mt-1',
        {
          'bg-transparent': noBg,
          'bg-[#E6E9F6]': !sameUser && !noBg,
          'border-secondary-200 border-2 bg-secondary-200 bg-opacity-5': sameUser,
        }
      )}
    >
      <div
        className={classNames('flex items-center mr-4', {
          'ml-2': noIcon,
        })}
      >
        {userProfilePic ? (
          <div>
            <img className="w-12 h-12 rounded-full " src={userProfilePic} alt="picture" />
          </div>
        ) : (
          <div className="mr-2">
            <DefaultIcon name={p2pProfile?.fullName || p2pProfile?.firstName + ' ' + p2pProfile?.lastName} />
          </div>
        )}

        <div className="flex flex-col items-start ml-3">
          <p className="text-lg font-sans-body font-semibold text-neutral-400">{p2pProfile?.userName}</p>
          <p className="text-lg font-sans text-neutral-400 font-neutral">{p2pProfile?.phone}</p>
        </div>
      </div>
    </div>
  );
};
