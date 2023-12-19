import React, { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import SvgClose from '@/components/icons/Close';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import classNames from 'classnames';
import GroupInfoIcon from '@/assets/icons/group-info.svg';
import { AvatarList } from './../avatar-list';
import avatar from '@/assets/images/avatar.jpg';
import doodles from '@/assets/icons/shape_bg.svg';
import { RequestMethod, useApi } from '@/helpers/api';
import { NewUserProfile } from '@/store/types';
import { groupMembers } from '../../lib/types';

export const ViewGroupModal: React.FC<any> = ({
  open,
  setOpen,
  children,
  bgColorStyle,
  buttonStyle,
  isLoading,
  actionClick,
  invite,
}) => {
  const [groupMembers, setGroupMembers] = useState<groupMembers[]>([]);
  const [admin, setAdmin] = React.useState<NewUserProfile>();

  const { submit: fetchAdmin } = useApi(`/users?user=${invite?.admin_id}`, {
    method: RequestMethod.GET,
    onSuccess(response) {
      setAdmin(response.data.data.user);
    },
  });

  useEffect(() => {
    setGroupMembers(invite?.members);

    fetchAdmin();
  }, [invite?.members]);

  return (
    <>
      <Modal open={open} setOpen={setOpen} className="rounded-2xl max-w-[560px]" dialogClasses="lg:top-[10%] top:auto">
        <>
          <div className="px-7 flex rounded-t-2xl">
            <div className="w-full items-center relative">
              <button className="absolute right-0 top-[33px]" onClick={() => setOpen?.(false)}>
                <SvgClose />
              </button>

              <Spacer className="h-8" />

              <div className="flex items-center">
                <img src={GroupInfoIcon} alt="" />
                <div className="font-sans text-neutral-500">Group invite info</div>
              </div>
            </div>
          </div>

          <Spacer className="h-8" />
        </>

        <div className="px-[30px]">
          <div className="group-overview flex flex-col justify-center items-center bg-neutral-100 bg-opacity-50 rounded-xl py-7 position">
            <img src={doodles} className="absolute" alt="" />
            <div className="mb-[20px]">
              <p className="text-[#AAB0C6] font-semibold">Group name</p>
              <p>{invite.group.groupName}</p>
            </div>
            <div>
              <p className="text-[#AAB0C6]">Created by</p>
              <p className="flex justify-center items-center">
                <img
                  src={admin?.user?.profilePic || avatar}
                  className="rounded-full w-[20px] h-[20px]"
                  alt="User profile"
                />{' '}
                <span className="ml-1 font-semibold">{admin?.user?.firstName}</span>
              </p>
            </div>
          </div>

          <div className="mb-[35px] mt-[40px]">
            <p className="text-[#AAB0C6] mb-3">Group Members ({invite?.members?.length})</p>
            <div className="w-full flex justify-center pl-2">
              <AvatarList groupMembers={groupMembers} />
            </div>
          </div>

          <p className="text-[#AAB0C6] mb-3">Group Description</p>
          <p className="text-[#252525] font-sans-body text-center px-7">{invite?.group.description}</p>
        </div>

        <Spacer className="lg:h-12 h-5" />
        <div className=" h-[2px] w-full bg-neutral-100 bg-opacity-60" />
        <Spacer className="h-8" />

        <div
          className={classNames(`px-7 w-full ${buttonStyle}`, {
            'text-right': !buttonStyle,
          })}
        >
          <div className="flex mt-2 mb-5 justify-center">
            <Button onClick={actionClick} loading={isLoading} variant="primary" className={`px-4 py-3 ${bgColorStyle}`}>
              Accept group invite
            </Button>
          </div>
        </div>
        <Spacer className="lg:h-7 h-5" />
      </Modal>
    </>
  );
};
