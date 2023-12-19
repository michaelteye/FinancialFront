import { format } from 'date-fns';
import React, { useState } from 'react';
import { Detail } from '../../savings/savings-details-row';
import { AvatarList } from './avatar-list';
import { GroupModalLayout } from './modals/modal-layout';
import SvgAccepted from '@/components/icons/Accepted';
import { DeleteModal } from './modals/delete-modal';
import { GroupInvitesDetails } from './group-invites-row';
import SvgStar from '@/components/icons/Star';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import SvgStarYellow from '@/components/icons/StarYellow';
import { AllGroupsRowProps } from '../lib/types';

export const AllGroupsRow: React.FC<AllGroupsRowProps> = ({ group, groupMembers = [], onFavorite, isFavorite }) => {
  const navigate = useNavigate();
  const [openAccept, setOpenAccept] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  function handleClick() {
    onFavorite?.({
      ref: group?.group?.ref_id,
    });
  }
  return (
    <>
      <GroupModalLayout
        open={openAccept}
        setOpen={setOpenAccept}
        icon={SvgAccepted}
        action="Join"
        headerText={<p className="font-sans-body text-neutral-400 font-semibold">Save with others</p>}
      >
        <p className="text-[#252525] font-sans-body text-center px-7">
          You’ve opted to join <span className="font-bold">“Class of 2011 group”.</span> This will give you access to
          contribute towards group’s goals
        </p>
      </GroupModalLayout>
      <DeleteModal
        open={openReject}
        setOpen={setOpenReject}
        text=" “Class of 2011 group” invitation will not be accessible to you if you go ahead to decline."
      />

      <div className="flex w-full justify-between items-center hover:rounded-xl hover:bg-opacity-40 hover:bg-neutral-100">
        <button
          onClick={() => navigate(`/dashboard/groups/${group?.group?.ref_id}`)}
          className="flex justify-between items-center p-2 w-full"
        >
          <div className="w-full flex">
            <GroupInvitesDetails
              GroupName={
                group?.group?.groupName?.length! > 17
                  ? `${group?.group?.groupName?.substring(0, 17)} ...`
                  : group?.group?.groupName
              }
              Ref={group?.group?.ref_id}
            />
          </div>

          <div className="w-full flex">
            <Detail label="Joined On" value={format(new Date(group?.group?.createdAt!), 'P')} />
          </div>
          <div className="w-full flex">
            <Detail label="No. of goals" value={group?.goals} />
          </div>

          <div className="w-full flex">
            <AvatarList groupMembers={groupMembers} />
          </div>
        </button>

        <div className="flex space-x-3 items-center">
          <div className="flex items-center">
            <button
              data-tip
              className="rounded-full py-2 px-5 bg-neutral-100 hover:shadow-md transition duration-75 ease-linear"
              onClick={() => handleClick()}
            >
              {isFavorite ? <SvgStarYellow /> : <SvgStar />}
            </button>
            <ReactTooltip place="right" delayHide={200} type="warning" effect="float">
              Make saving goal a Favourite
            </ReactTooltip>
          </div>
        </div>
      </div>
    </>
  );
};
