import Slider from 'react-slick';
import { Title } from '../components/title';
import { Spacer } from '@/components/spacer';
import { useWidth } from '@/hooks/use-width';
import { Input } from '@/components/input/input';
import { Spinner } from '@/components/spinner';
import { CarouselArrow } from '../savings/savings';
import { useMessagesStore } from '@/store/messages';
import { NoInvites } from './components/no-invites';
import { RequestMethod, useApi } from '@/helpers/api';
import { Fragment, useEffect, useState } from 'react';
import SvgReceipt2 from '@/components/icons/Receipt2';
import { useNavigate, useParams } from 'react-router-dom';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import SvgArrowLeftBig from '@/components/icons/ArrowLeftBig';
import { AddMemberButtons } from './components/addmember-button';
import { CreateSplitPay } from './split-and-make-payment/split';
import { AdminGroupViewPage } from './create-group/admin-group-page';
import { Arrow, LeftArrow, Plus, RightArrow } from '@/components/icons';
import { GroupSavingDetails } from './components/group-savings-details';
import { MemberList, PendingMemberList } from './components/member-list';
import { GroupDetails, GroupGoalsData, Members } from './components/types';
import { GroupSavingsGoalCard } from './components/group-savings-goal-card';
import { CreateGroupSavingGoal } from './create-goal/create-group-saving-goal';
import { SplitPayGroup } from './split-and-make-payment/split-pay-group-page';
import { GroupSavingsDetailsRatingsRow } from '../savings/savings-details-row';
import { GroupActionButtons } from './components/group-action-buttons';
import { GroupDetailsPage } from './lib/types';

export const GroupsGoals = () => {
  const width = useWidth();
  const params = useParams();
  const navigate = useNavigate();
  const { displayMessage } = useMessagesStore();
  const [createSplit, setCreateSplit] = useState(false);
  const [openCreateGoal, setOpenCreateGoal] = useState(false);
  const [savingGoalSearch, setSavingGoalSearch] = useState('');
  const [groupMembers, setGroupMembers] = useState<Members[]>([]);
  const [groupDetails, setGroupDetails] = useState<GroupDetails>();
  const [favoriteGoals, setFavoriteGoals] = useState<GroupGoalsData[]>([]);
  const [pendingGroupInvites, setPendingGroupInvites] = useState<Members[]>([]);
  const [groupSavingGoals, setGroupSavingGoals] = useState<GroupGoalsData[]>([]);
  const [filteredSavingGoals, setFilteredSavingGoals] = useState<GroupGoalsData[]>([]);

  const { submit: fetchGroupDetails } = useApi(`/user/groups?ref=${params.refId}`, {
    method: RequestMethod.GET,
    onSuccess(response) {
      setGroupDetails(response?.data?.data);
    },
  });

  const { submit: fetchFavoriteGoals } = useApi(`/group/favorites?ref=${params.refId}`, {
    method: RequestMethod.GET,
    onSuccess(response) {
      setFavoriteGoals(response?.data?.data.favoriteGoals);
    },
  });

  const { submit: fetchGroupMembers } = useApi(`/group/users?group=${params.refId}`, {
    onSuccess(response) {
      setGroupMembers(response?.data?.data?.members);
    },

    method: RequestMethod.GET,
  });

  const { submit: fetchGroupInvites } = useApi(`/group/requests?group=${params.refId}`, {
    onSuccess(response) {
      const invites = response?.data?.data.requests;
      setPendingGroupInvites(invites);
    },
    method: RequestMethod.GET,
  });

  const { submit: fetchGroupGoals, isLoading: isFetchingGroupGoals } = useApi(
    `/group/saving-goals?ref=${params.refId}`,
    {
      method: RequestMethod.GET,
      onSuccess(response) {
        setGroupSavingGoals(response?.data?.data?.savingGoals);
      },
    }
  );

  const { submit: makeFavourite } = useApi('/group/goals/favorite', {
    onSuccess(response) {
      displayMessage({
        title: 'Success',
        description: response?.data?.message,
        variant: 'success',
      });
      fetchFavoriteGoals();
    },
  });

  useEffect(() => {
    setFilteredSavingGoals(
      groupSavingGoals?.filter((groupSavingGoal) => {
        return groupSavingGoal?.goalName?.toLowerCase().match(savingGoalSearch.toLowerCase());
      })
    );
  }, [savingGoalSearch]);

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  useEffect(() => {
    fetchFavoriteGoals();
  }, []);

  useEffect(() => {
    fetchGroupInvites();
  }, []);

  useEffect(() => {
    fetchGroupGoals();
  }, []);

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  let type = '';

  if (type === 'splitPay') {
    return <SplitPayGroup />;
  }
  if (type === 'Admin') {
    return <AdminGroupViewPage />;
  }

  const renderUserGoals = favoriteGoals?.map((favoriteGoal, idx) => {
    return (
      <div className="w-full lg:pr-4 bg-transparent">
        <GroupSavingsGoalCard
          groupRefId={params.refId}
          className={idx % 2 === 1 ? 'savingCardOdd' : undefined}
          savingGoal={favoriteGoal}
          members={groupMembers}
          isAdmin={groupDetails?.isAdmin}
        />
      </div>
    );
  });
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: width < EScreenBreakpoints.LG ? 1 : 3,
    slidesToScroll: 1,
    nextArrow: (
      <CarouselArrow right>
        <RightArrow />
      </CarouselArrow>
    ),
    prevArrow: (
      <CarouselArrow>
        <LeftArrow />
      </CarouselArrow>
    ),
  };

  const favoriteId = favoriteGoals.map((favoriteGoal) => {
    return favoriteGoal?.details?._id;
  });

  const SliderWrapper = width < EScreenBreakpoints.LG ? 'div' : Fragment;
  return (
    <>
      <CreateGroupSavingGoal open={openCreateGoal} setOpen={setOpenCreateGoal} fetchSavingGoals={fetchGroupGoals} />
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
        <Title title={groupDetails?.group?.groupName!} />
      </div>

      <Spacer className="h-8" />

      <GroupActionButtons
        groupPage={GroupDetailsPage.DEFAULT}
        editGroupName={groupDetails?.group?.groupName!}
        groupGoals={groupSavingGoals}
        fetchGroupDetails={fetchGroupDetails}
        isAdmin={groupDetails?.isAdmin}
        groupDetails={groupDetails}
      />

      <Spacer className="h-6" />

      <div className="bg-[#F2ECF6] rounded-2xl py-8 px-12 grid lg:grid-cols-5 grid-cols-2 gap-4 lg:gap-0">
        <GroupSavingDetails
          title="Total savings"
          description={`GHS ${groupDetails ? parseFloat(groupDetails?.totalSavings!).toFixed(2) : '--'}`}
        />

        <GroupSavingDetails
          title="Balance"
          description={`GHS ${groupDetails ? parseFloat(groupDetails?.totalGroupBalance!).toFixed(2) : '--'}`}
        />

        <GroupSavingDetails
          title="Amount withdrawn"
          description={`GHS ${groupDetails ? parseFloat(groupDetails?.totalWithdrawal!).toFixed(2) : '--'}`}
        />
        <GroupSavingDetails title="No. of group goals" description={groupDetails?.totalGroupGoals} />
        <GroupSavingDetails title="No. of group members" description={groupDetails?.totalMembers} />
      </div>

      <Spacer className="h-6" />

      <p className="text-lg font-sans text-neutral-400 mt-8">Recently added / Favorite saving goal</p>

      <Spacer className="h-6" />

      {isFetchingGroupGoals ? (
        <div className="w-full h-80 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          {groupDetails?.isAdmin ? (
            <button
              onClick={() => {
                setOpenCreateGoal(true);
              }}
              className="lg:px-9 h-[280px] border border-neutral-100 bg-neutral-100 bg-opacity-50 rounded-xl items-center hover:shadow-md transition duration-75 ease-linear"
            >
              <div className="flex flex-col  items-center">
                <Plus />
                <p className="font-sans text-sm text-[#000] text-center mt-2 w-32">Create a Savings Goal </p>
              </div>
            </button>
          ) : null}

          <SliderWrapper>
            {renderUserGoals?.length! > 3 || width <= EScreenBreakpoints.LG ? (
              <Slider className="col-span-3" {...settings}>
                {renderUserGoals}
              </Slider>
            ) : (
              renderUserGoals
            )}
          </SliderWrapper>
        </div>
      )}

      <Spacer className="h-6" />

      <div className=" flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:justify-between mt-15">
        <p className="font-sans font-medium text-2xl text-neutral-400 ">All Group Saving goals</p>
        <div className="lg:w-1/3">
          <Input
            className="rounded-xl border border-[#161617] border-opacity-5 bg-[#ecf1f4] bg-opacity-30 placeholder-opacity-40 text-sm py-3"
            type="search"
            placeholder="Search savings goal"
            onChange={(event) => {
              setSavingGoalSearch(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full overflow-x-scroll lg:overflow-x-auto">
        <div className="overflow-x-scroll lg:overflow-x-auto w-[750px] lg:w-full">
          {(savingGoalSearch ? filteredSavingGoals : groupSavingGoals)?.map((groupSavingGoal) => {
            return (
              <GroupSavingsDetailsRatingsRow
                key={groupSavingGoal?._id}
                groupGoal={groupSavingGoal}
                onFavorite={makeFavourite}
                groupRefId={params.refId}
                members={groupMembers}
                isAdmin={groupDetails?.isAdmin}
                isFavorite={favoriteId.includes(groupSavingGoal._id)}
              />
            );
          })}
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
          {groupDetails?.isAdmin ? (
            <AddMemberButtons groupName={groupDetails?.group?.groupName} fetchInvites={fetchGroupInvites} />
          ) : null}
        </div>

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          {groupMembers?.map((groupMember) => {
            return (
              <div
                key={groupMember._id}
                className="flex flex-col space-y-4  overflow-x-scroll lg:overflow-x-auto w-[1100px] lg:w-full"
              >
                <MemberList
                  memberInfo={groupMember}
                  groupName={groupDetails?.group?.groupName!}
                  isAdmin={groupDetails?.isAdmin}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Spacer className="h-16" />
      <p className="font-sans font-medium text-2xl text-neutral-400 ">Pending invites</p>

      <Spacer className="h-5" />

      <div className="flex flex-col space-y-8 bg-[#F3F2F84D] bg-opacity-30 rounded-2xl border border-[#F3F2F8] p-8">
        <h4 className="text-[#000] font-sans text-sm">Pending member list</h4>

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <div className="flex flex-col lg:w-full overflow-x-scroll  w-[1100px] lg:overflow-auto space-y-5">
            {pendingGroupInvites.length === 0 ? (
              <NoInvites />
            ) : (
              pendingGroupInvites?.map((pendingGroupInvite) => {
                return (
                  <div
                    key={pendingGroupInvite._id}
                    className="flex flex-col space-y-4 overflow-x-scroll lg:overflow-x-auto w-[1100px] lg:w-full"
                  >
                    <PendingMemberList
                      memberInfo={pendingGroupInvite}
                      groupName={groupDetails?.group?.groupName}
                      fetchPendingInvites={fetchGroupInvites}
                      isAdmin={groupDetails?.isAdmin}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
