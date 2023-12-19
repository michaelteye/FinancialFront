import Slider from 'react-slick';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import { useAuthStore } from '@/store/auth';
import { Title } from '../components/title';
import { Spacer } from '@/components/spacer';
import { useParams } from 'react-router-dom';
import { useWidth } from '@/hooks/use-width';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/input/input';
import { CarouselArrow } from '../savings/savings';
import { useMessagesStore } from '@/store/messages';
import { GroupCard } from './components/group-card';
import { RequestMethod, useApi } from '@/helpers/api';
import { Fragment, useEffect, useState } from 'react';
import { Members, userGroup } from './components/types';
import { TabHeader } from '../transactions/transactions';
import { CreateGroup } from './create-group/create-group';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { AllGroupsRow } from './components/all-groups-row';
import { PendingInviteComp } from '../home/home';
import { NoGroups, NoInvites } from './components/no-invites';
import { LeftArrow, Plus, RightArrow } from '@/components/icons';
import { GroupInvitesRow } from './components/group-invites-row';
import { UpgradeToAdvanced } from '@/components/modal/upgrade-advanced';
import { PendingInvites } from '../tools/types';
import { ActionModal } from '@/components/modal/action-modal';

export enum GroupsTab {
  PENDING_INVITATIONS = 'PENDING_INVITATIONS',
  ALL_GROUPS = 'ALL_GROUPS',
}
export const Groups = () => {
  const width = useWidth();
  const { userProfile } = useAuthStore();
  const { displayMessage } = useMessagesStore();
  const [createGroup, setCreateGroup] = useState(false);
  const [userGroups, setUserGroups] = useState<userGroup[]>([]);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const [openMaintainance, setOpenMaintainance] = useState(false);
  const [groupsInvitesSearch, setGroupsInvitesSearch] = useState('');
  const [showPendingInvites, setShowPendingInvites] = useState(false);
  const [favoriteGroups, setFavoriteGroups] = useState<userGroup[]>([]);
  const [tab, setTab] = useState<GroupsTab>(GroupsTab.PENDING_INVITATIONS);
  const [pendingInvites, setPendingInvites] = useState<PendingInvites[]>([]);
  const [filteredGroupsSearch, setFilteredGroupsSearch] = useState<userGroup[]>([]);
  const [filteredInvitesSearch, setFilteredInvitesSearch] = useState<PendingInvites[]>([]);

  const { submit: fetchUserGroups, isLoading: isFetchingUserGroups } = useApi('/user/groups', {
    method: RequestMethod.GET,
    onSuccess(response) {
      const groups = response?.data?.data?.groups;
      setUserGroups(groups);
    },
  });

  const { submit: fetchFavoriteGroups } = useApi('/group/favorites', {
    method: RequestMethod.GET,
    onSuccess(response) {
      setFavoriteGroups(response?.data?.data.favoriteGroups);
    },
  });

  const { submit: fetchGroupInvites } = useApi(
    `/group/requests?phone=${userProfile?.phone ? userProfile?.phone : ''}`,
    {
      onSuccess(response) {
        const invites = response?.data?.data.requests;
        setPendingInvites(invites);
        if (invites?.length > 0) {
          setShowPendingInvites(true);
        }
      },
      method: RequestMethod.GET,
    }
  );

  const { submit: makeFavourite } = useApi('/group/favorites', {
    onSuccess(response) {
      displayMessage({
        title: 'Success',
        description: response?.data?.message,
        variant: 'success',
      });
      fetchFavoriteGroups();
    },
  });

  useEffect(() => {
    fetchUserGroups();
  }, []);

  useEffect(() => {
    fetchFavoriteGroups();
  }, []);

  useEffect(() => {
    fetchGroupInvites();
  }, []);

  useEffect(() => {
    if (tab === GroupsTab.PENDING_INVITATIONS) {
      setFilteredInvitesSearch(
        pendingInvites?.filter((pendingInvite) => {
          return pendingInvite?.group?.groupName.toLowerCase().match(groupsInvitesSearch.toLowerCase());
        })
      );
    }

    if (tab === GroupsTab.ALL_GROUPS) {
      setFilteredGroupsSearch(
        userGroups?.filter((userGroup) => {
          return userGroup?.group?.groupName.toLowerCase().match(groupsInvitesSearch.toLowerCase());
        })
      );
    }
  }, [groupsInvitesSearch]);

  // useEffect(() => {
  //   if (userProfile?.level !== 'advance') {
  //     setOpenUpgradeModal(true);
  //   }
  // }, []);

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

  const SliderWrapper = width < EScreenBreakpoints.LG ? 'div' : Fragment;

  const renderUserGroupCards = favoriteGroups?.map((favoriteGroup, idx) => {
    return (
      <div key={favoriteGroup?._id} className="w-full lg:pr-4 bg-transparent">
        <GroupCard
          className={idx % 2 === 1 ? 'savingCardOdd' : undefined}
          userGroupData={favoriteGroup}
          groupMembers={favoriteGroup?.members}
        />
      </div>
    );
  });

  const favoriteId = favoriteGroups.map((favoriteGroup) => {
    return favoriteGroup?.details?._id;
  });

  const renderUserGroupRow = (groupsInvitesSearch && GroupsTab.ALL_GROUPS ? filteredGroupsSearch : userGroups)?.map(
    (userGroup, idx) => {
      return (
        <AllGroupsRow
          key={idx}
          group={userGroup}
          groupMembers={userGroup?.members}
          onFavorite={makeFavourite}
          isFavorite={favoriteId.includes(userGroup?.group?._id)}
        />
      );
    }
  );

  const renderPendingInviteRow = (
    groupsInvitesSearch && GroupsTab.PENDING_INVITATIONS ? filteredInvitesSearch : pendingInvites
  )?.map((pendingInvite, idx) => {
    return (
      <GroupInvitesRow
        key={idx}
        pendingInvite={pendingInvite}
        groupMembers={pendingInvite?.members}
        fetchInvites={fetchGroupInvites}
        fetchGroups={fetchUserGroups}
      />
    );
  });

  return (
    <>
      <CreateGroup open={createGroup} setOpen={setCreateGroup} onSave={fetchUserGroups} />
      <ActionModal
        open={openMaintainance}
        setOpen={setOpenMaintainance}
        heading="Alert 💥"
        action="Close"
        hideCancel
        className="lg:w-[536px]"
        buttonposition="text-center"
        actionButtonProps={{
          className: 'text-center',
          onClick: () => setOpenMaintainance(false),
        }}
      >
        <div className="px-7 pt-5 border-b border-neutral-100">
          <p className="font-sans-body font-semibold lg:text-sm text-xs text-center text-neutral-400">
            Sorry!, The group savings feature is currently being upgraded. Please try again later.
          </p>

          <Spacer className="h-6" />
        </div>
      </ActionModal>

      <UpgradeToAdvanced open={openUpgradeModal} />

      <Title title="Group Savings" />

      {pendingInvites?.length! > 0 ? (
        <>
          <Spacer className="h-8" />

          <PendingInviteComp
            open={showPendingInvites}
            setOpen={() => {
              setShowPendingInvites(false);
            }}
            pendingInvites={pendingInvites}
          />
        </>
      ) : null}

      <Spacer className="h-4" />

      <p className="text-lg font-sans text-neutral-400 mt-8">Created Groups</p>

      <Spacer className="h-6" />

      {isFetchingUserGroups ? (
        <div className="w-full h-80 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          <button
            onClick={() => {
              // setCreateGroup(true);
              setOpenMaintainance(true);
            }}
            className="lg:px-9 border h-[280px] border-neutral-100 bg-neutral-100 bg-opacity-50 rounded-xl items-center hover:shadow-md transition duration-75 ease-linear"
          >
            <div className="flex flex-col  items-center">
              <Plus />
              <p className="font-sans text-sm text-[#000] text-center mt-2">Create a Group </p>
            </div>
          </button>

          <SliderWrapper>
            {renderUserGroupCards?.length! > 3 || width <= EScreenBreakpoints.LG ? (
              <Slider className="col-span-3" {...settings}>
                {renderUserGroupCards}
              </Slider>
            ) : (
              renderUserGroupCards
            )}
          </SliderWrapper>
        </div>
      )}

      <Spacer className="h-12" />

      <div className=" flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:justify-between mt-15">
        <p className="font-sans font-medium text-2xl text-neutral-400 ">Group savings list and Invites</p>
        <div className="lg:w-1/3">
          <Input
            className="rounded-xl border border-[#161617] border-opacity-5 bg-[#ecf1f4] bg-opacity-30 placeholder-opacity-40 text-sm py-3"
            type="search"
            value={groupsInvitesSearch}
            placeholder="Search saving group here"
            onChange={(event) => {
              setGroupsInvitesSearch(event?.target?.value);
            }}
          />
        </div>
      </div>
      <Spacer className="h-6" />
      <Tab.Group>
        <div className="relative flex justify-between">
          <div className="border-b border-neutral-100 overflow-x-scroll lg:overflow-x-hidden w-[800px] lg:w-full">
            <Tab.List className="space-x-8 lg:space-x-16 flex w-[800px] lg:w-full">
              <Tab className=" border-transparent">
                {({ selected }) => (
                  <TabHeader
                    onClick={() => {
                      setTab(GroupsTab.PENDING_INVITATIONS);
                      setGroupsInvitesSearch('');
                    }}
                    selected={selected}
                  >
                    Pending Invitations
                  </TabHeader>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <TabHeader
                    onClick={() => {
                      setTab(GroupsTab.ALL_GROUPS);
                      setGroupsInvitesSearch('');
                    }}
                    selected={selected}
                  >
                    All Groups
                  </TabHeader>
                )}
              </Tab>
            </Tab.List>
          </div>
        </div>

        <Spacer className="h-12" />

        <div className="w-full overflow-x-scroll lg:overflow-auto">
          <Tab.Panels>
            <div
              className={classNames('lg:overflow-x-auto lg:w-full', {
                'w-[1000px] overflow-x-scroll': renderPendingInviteRow.length > 0,
              })}
            >
              <Tab.Panel className="flex flex-col space-y-4">
                <>
                  {renderPendingInviteRow.length > 0 ? (
                    renderPendingInviteRow
                  ) : groupsInvitesSearch && pendingInvites.length > 0 ? null : (
                    <NoInvites />
                  )}
                </>
              </Tab.Panel>
            </div>
            <div
              className={classNames('lg:overflow-x-auto lg:w-full', {
                'w-[1000px] overflow-x-scroll': renderUserGroupRow.length > 0,
              })}
            >
              <Tab.Panel className=" flex flex-col space-y-4">
                <>
                  {renderUserGroupRow.length > 0 ? (
                    renderUserGroupRow
                  ) : groupsInvitesSearch && userGroups.length > 0 ? null : (
                    <NoGroups />
                  )}
                </>
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </div>
      </Tab.Group>

      <Spacer className="h-24" />
    </>
  );
};
