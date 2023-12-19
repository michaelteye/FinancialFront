import { useState } from 'react';
import { CreateSplitPay } from './split';
import { Spacer } from '@/components/spacer';
import { Title } from '../../components/title';
import { useNavigate } from 'react-router-dom';
import { Arrow, Plus } from '@/components/icons';
import { Input } from '@/components/input/input';
import SvgReceipt2 from '@/components/icons/Receipt2';
import { MemberList } from '../components/member-list';
import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import { GroupActionButtons } from '../components/group-action-buttons';
import { GroupSavingDetails } from '../components/group-savings-details';
import { GroupSavingsGoalCard } from '../components/group-savings-goal-card';
import { CreateGroupSavingGoal } from '../create-goal/create-group-saving-goal';
import { AddMembers } from '../create-group/add-members';
import { AddMemberButtons } from '../components/addmember-button';
import { GroupDetailsPage } from '../lib/types';

export const SplitPayGroup = () => {
  const navigate = useNavigate();
  const [openCreateGoal, setOpenCreateGoal] = useState(false);
  const [createSplit, setCreateSplit] = useState(false);

  return (
    <>
      <CreateGroupSavingGoal open={openCreateGoal} setOpen={setOpenCreateGoal} />
      <CreateSplitPay open={createSplit} setOpen={setCreateSplit} />

      <Spacer className="h-8" />

      <div className="flex space-x-4">
        <button
          onClick={() => {
            navigate('/dashboard/groups');
          }}
        >
          <SvgArrowLeftBig />
        </button>
        <Title title="Computer science class of 2000" />
      </div>

      <Spacer className="h-8" />

      <div className="flex flex-col lg:flex-row w-full rounded-xl px-4 py-2 bg-[#F3F2F8] border border-[#F3F2F8] lg:items-center lg:justify-between space-y-3 lg:space-y-0">
        <div className="flex space-x-3 items-center">
          <div>
            <SvgReceipt2 />
          </div>

          <p className="text-neutral-400 font-sans-body text-sm">
            <span className="font-semibold text-primary-400"> Split and pay </span> you can now Share bills and payments
            among friends in a group.
          </p>
        </div>

        <button onClick={() => setCreateSplit(true)} className="flex space-x-3">
          <p className="underline text-sm"> Create split payment</p>
          <Arrow />
        </button>
      </div>

      <Spacer className="h-6" />

      <GroupActionButtons groupPage={GroupDetailsPage.SPLIT_AND_PAY} />

      <Spacer className="h-6" />

      <div className="bg-[#F2ECF6] rounded-2xl py-8 px-12 grid lg:grid-cols-4 grid-cols-2 gap-4 lg:gap-0">
        <GroupSavingDetails title="Total savings" description={`GHS 5`} />
        <GroupSavingDetails title="Amount withdrawn" description={`GHS 5`} />
        <GroupSavingDetails title="No. of group goals" description={`10`} />
        <GroupSavingDetails title="No. of group members" description={`10`} />
      </div>

      <Spacer className="h-6" />

      <p className="text-lg font-sans text-neutral-400 mt-8">Recently added / Favorite saving goal</p>

      <Spacer className="h-6" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        <button
          onClick={() => {
            setOpenCreateGoal(true);
          }}
          className="lg:px-9 border border-neutral-100 bg-neutral-100 bg-opacity-50 rounded-xl items-center hover:shadow-md transition duration-75 ease-linear"
        >
          <div className="flex flex-col  items-center">
            <Plus />
            <p className="font-sans text-sm text-[#000] text-center mt-2 w-32">Create a Savings Goal </p>
          </div>
        </button>

        <GroupSavingsGoalCard />
      </div>

      <Spacer className="h-6" />

      <div className=" flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:justify-between mt-15">
        <p className="font-sans font-medium text-2xl text-neutral-400 ">All Group Saving goals</p>
        <div className="lg:w-1/3">
          <Input
            className="rounded-xl border border-[#161617] border-opacity-5 bg-[#ecf1f4] bg-opacity-30 placeholder-opacity-40 text-sm py-3"
            type="search"
            placeholder="Search savings goal"
          />
        </div>
      </div>

      <Spacer className=" h-12" />

      <div className="w-full overflow-x-scroll lg:overflow-x-auto">
        <div className="overflow-x-scroll lg:overflow-x-auto w-[750px] lg:w-full"></div>
      </div>
      <Spacer className="h-16" />
      <p className="font-sans font-medium text-2xl text-neutral-400 ">Group member list</p>

      <Spacer className="h-5" />

      <div className="flex flex-col space-y-8 bg-[#F3F2F84D] bg-opacity-30 rounded-2xl border border-[#F3F2F8] p-8">
        <div className="flex justify-between items-center">
          <h4 className="text-[#000] font-sans text-sm">MEMBER LIST</h4>

          <AddMemberButtons />
        </div>
        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="flex flex-col space-y-4  overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
            <MemberList />
            <MemberList />
            <MemberList />
            <MemberList />
            <MemberList />
          </div>
        </div>
      </div>

      <Spacer className="h-16" />
      <p className="font-sans font-medium text-2xl text-neutral-400 ">Pending invites</p>

      <Spacer className="h-5" />

      <div className="flex flex-col space-y-8 bg-[#F3F2F84D] bg-opacity-30 rounded-2xl border border-[#F3F2F8] p-8">
        <h4 className="text-[#000] font-sans text-sm">Pending member list</h4>
        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="flex flex-col space-y-4 overflow-x-scroll lg:overflow-x-auto w-[800px] lg:w-full">
            <MemberList />
            <MemberList />
          </div>
        </div>
      </div>
    </>
  );
};
