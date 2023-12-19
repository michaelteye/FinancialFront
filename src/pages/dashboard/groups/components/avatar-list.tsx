import classNames from 'classnames';
import { groupMembers } from '../lib/types';
import { DefaultIcon } from './dropdown';
import { Members } from './types';

export const AvatarList: React.FunctionComponent<{
  groupMembers?: groupMembers[];
}> = ({ groupMembers }) => {
  const displayedMembers = groupMembers ? groupMembers.slice(0, 4) : [];
  const membersLeft = groupMembers?.length! - displayedMembers?.length!;

  return (
    <div className="flex items-center">
      {displayedMembers?.map((member, idx) => {
        return !!member?.profile?.user?.profilePic ? (
          <div
            key={member._id}
            className={classNames('w-10 h-10 flex', {
              '-ml-2': idx !== 0,
            })}
          >
            <img key={idx} className="w-10 h-10 rounded-full" src={member?.profile?.user?.profilePic} alt="profile" />
          </div>
        ) : (
          <div key={idx} className="w-10 h-10 -ml-2">
            <DefaultIcon name={member?.profile?.user?.firstName} idx={idx} />
          </div>
        );
      })}
      {!!membersLeft ? (
        <div
          className={classNames(
            'w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-full text-[#000] font-medium -ml-2',
            {
              hidden: !membersLeft,
            }
          )}
        >
          + <span>{membersLeft}</span>
        </div>
      ) : null}
    </div>
  );
};

export const AvatarGoalList: React.FunctionComponent<{
  goalMembers?: Members[];
}> = ({ goalMembers }) => {
  const displayedMembers = goalMembers ? goalMembers.slice(0, 4) : [];
  const membersLeft = goalMembers?.length! - displayedMembers?.length!;

  return (
    <div className="flex items-center">
      {displayedMembers?.map((member, idx) => {
        return !!member?.user?.profilePic ? (
          <div className="w-10 h-10 flex">
            <img key={idx} className="w-10 h-10 rounded-full -ml-2" src={member?.user?.profilePic} alt="profile" />
          </div>
        ) : (
          <div key={idx} className="w-10 h-10 -ml-2">
            <DefaultIcon name={member?.user?.fullName} idx={idx} />
          </div>
        );
      })}
      {!!membersLeft ? (
        <div
          className={classNames(
            'w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-full text-[#000] font-medium -ml-2',
            {
              hidden: !membersLeft,
            }
          )}
        >
          + <span>{membersLeft}</span>
        </div>
      ) : null}
    </div>
  );
};
