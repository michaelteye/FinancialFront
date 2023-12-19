import classNames from 'classnames';
import { EditGroup } from './edit-group';
import { Fragment, useState } from 'react';
import { GroupInfo } from './group-info';
import { Button } from '@/components/button';
import { useParams } from 'react-router-dom';
import { useWidth } from '@/hooks/use-width';
import SvgEdit from '@/components/icons/Edit';
import SvgInfo from '@/components/icons/Info';
import SvgDots from '@/components/icons/Dots';
import { GroupGoalInfo } from './group-goal-info';
import { Menu, Transition } from '@headlessui/react';
import { TopUp, Withdraw } from '@/components/icons';
import SvgReceipt3 from '@/components/icons/Receipt3';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { WithdrawalSlots } from './modals/withdrawal-slots';
import { GroupDetails, GroupGoalsData, primaryDetails, userGroup } from './types';
import { ContributeSetup } from '../group-transactions/contribute/contribute-setup';
import { WithdrawalSetup } from '../group-transactions/withdrawal/withdrawal-setup';
import { CreateSavingsGoalLayout } from '../../savings/components/create-savings-goal-layout';
import { GroupActionButtonsProps, GroupDetailsPage, GroupGoalPages } from '../lib/types';

export const GroupActionButtons: React.FC<GroupActionButtonsProps> = ({
  disabled,
  fetchGroupDetails,
  editGroupName,
  infoClick,
  goalPage,
  groupPage,
  userGroups,
  groupGoals,
  isAdmin,
  groupDetails,
  fetchPayouts,
  goalData,
  goalPrimaryDetails,
}) => {
  const width = useWidth();
  const params = useParams();
  const [openGroupInfo, setOpenGroupInfo] = useState(false);
  const [openGroupGoalInfo, setOpenGroupGoalInfo] = useState(false);
  const [openEditgroup, setOpenEditGroup] = useState(false);
  const [openContribute, setOpenContribute] = useState(false);
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
  const [openWithdrawalSlots, setOpenWithdrawalSlots] = useState(false);

  return (
    <>
      <WithdrawalSetup
        open={openWithdrawal}
        setOpen={setOpenWithdrawal}
        goalData={goalData}
        fetchPayouts={fetchPayouts}
      />

      <ContributeSetup
        open={openContribute}
        setOpen={setOpenContribute}
        groups={userGroups}
        groupGoals={groupGoals}
        goalPrimaryDetails={goalPrimaryDetails}
        goalDetails={goalData}
      />

      <CreateSavingsGoalLayout
        open={openGroupInfo}
        title="Group Info"
        width="md:w-[45%]"
        closeModal={() => setOpenGroupInfo(false)}
      >
        <GroupInfo groupInfo={groupDetails} />
      </CreateSavingsGoalLayout>

      <CreateSavingsGoalLayout
        open={openGroupGoalInfo}
        width="md:w-[45%]"
        title="Group Info"
        closeModal={() => setOpenGroupGoalInfo(false)}
      >
        <GroupGoalInfo goalInfo={goalData} />
      </CreateSavingsGoalLayout>

      <EditGroup
        open={openEditgroup}
        setOpen={setOpenEditGroup}
        fetchGroupDetails={fetchGroupDetails}
        groupName={editGroupName}
      />

      <WithdrawalSlots open={openWithdrawalSlots} setOpen={setOpenWithdrawalSlots} />

      <div className=" flex justify-between">
        <div
          className={classNames('lg:flex lg:space-x-2', {
            'flex flex-wrap-reverse': groupPage === GroupDetailsPage.SPLIT_AND_PAY,
          })}
        >
          <div>
            {groupPage === GroupDetailsPage.SPLIT_AND_PAY || groupPage === GroupDetailsPage.ADMIN ? (
              <Button onClick={() => {}} variant="secondary">
                <span className="flex lg:justify-between space-x-1 items-center">
                  <div>
                    <SvgReceipt3 />
                  </div>
                  <p className="lg:text-base text-xs">Make a split and pay payment</p>
                </span>
              </Button>
            ) : null}
          </div>

          <div
            className={classNames('space-x-2', {
              'mb-2': groupPage === GroupDetailsPage.SPLIT_AND_PAY,
            })}
          >
            {groupPage === GroupDetailsPage.ADMIN ? null : (
              <Button
                onClick={() => {
                  setOpenContribute(true);
                }}
                variant="secondary"
              >
                <span className="flex lg:justify-between justify-center space-x-2 items-center">
                  <TopUp />

                  <p className="lg:text-base text-xs">Add Contribution</p>
                </span>
              </Button>
            )}

            {goalPage !== GroupGoalPages.ROTATIONAL &&
            goalPage !== GroupGoalPages.SPLIT_AND_PAY &&
            groupPage !== GroupDetailsPage.ADMIN &&
            params.goalId &&
            width >= EScreenBreakpoints.LG ? (
              <Button onClick={() => setOpenWithdrawal(true)} variant="secondary">
                <span className="flex lg:justify-between space-x-1 items-center">
                  <Withdraw />
                  <p className="lg:text-base text-xs">Withdraw</p>
                </span>
              </Button>
            ) : null}
          </div>
        </div>

        {width >= EScreenBreakpoints.LG ? (
          <div className=" flex space-x-3">
            {goalPage !== GroupGoalPages.ROTATIONAL ? null : (
              <Button variant="secondary" onClick={() => setOpenWithdrawalSlots(true)}>
                <p className=" text-sm text-neutral-700 font-sans">View rotational slots</p>
              </Button>
            )}

            <>
              {isAdmin && !params.goalId ? (
                <Button disabled={disabled} variant="secondary" onClick={() => setOpenEditGroup(true)}>
                  <span className=" flex space-x-2">
                    <SvgEdit />
                    <p className="lg:text-base text-sm text-neutral-700 font-sans">Edit</p>
                  </span>
                </Button>
              ) : null}

              <Button
                onClick={() => {
                  if (!params.goalId) {
                    setOpenGroupInfo(true);
                  }
                  if (params.goalId) {
                    setOpenGroupGoalInfo(true);
                  }
                  infoClick?.();
                }}
                variant="secondary"
              >
                <SvgInfo />
              </Button>
            </>
          </div>
        ) : (
          <div className=" relative ">
            <Menu as="div">
              <Menu.Button className="flex font-sans py-3 border border-[#161617] border-opacity-5 p-2 rounded-xl text-sm text-neutral-500 items-center bg-none ml-2">
                {() => <SvgDots />}
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="flex flex-col space-y-2 px-6 py-6 absolute -right-2 w-60 origin-top-right bg-white rounded-md shadow-xl ">
                  {goalPage !== GroupGoalPages.ROTATIONAL ? null : (
                    <Menu.Item>
                      {() => (
                        <Button variant="secondary" onClick={() => {}}>
                          <p className=" text-sm text-neutral-700 font-sans">View Rotational slots</p>
                        </Button>
                      )}
                    </Menu.Item>
                  )}
                  {goalPage !== GroupGoalPages.ROTATIONAL &&
                  goalPage !== GroupGoalPages.SPLIT_AND_PAY &&
                  params.goalId &&
                  groupPage !== GroupDetailsPage.ADMIN ? (
                    <Button onClick={() => setOpenWithdrawal(true)} variant="secondary">
                      <span className="flex lg:justify-between space-x-1 items-center">
                        <Withdraw />
                        <p className="lg:text-base text-xs">Withdraw</p>
                      </span>
                    </Button>
                  ) : null}

                  {params.refId ? (
                    <>
                      {' '}
                      {isAdmin ? (
                        <Menu.Item>
                          {() => (
                            <Button disabled={disabled} variant="secondary" onClick={() => setOpenEditGroup(false)}>
                              <span className=" flex space-x-2">
                                <SvgEdit />
                                <p className=" text-sm text-neutral-700 font-sans">Edit</p>
                              </span>
                            </Button>
                          )}
                        </Menu.Item>
                      ) : null}
                      <Menu.Item>
                        {() => (
                          <Button
                            onClick={() => {
                              if (!params.goalId) {
                                setOpenGroupInfo(true);
                              }
                              if (params.goalId) {
                                setOpenGroupGoalInfo(true);
                              }
                              infoClick?.();
                            }}
                            variant="secondary"
                          >
                            <span className=" flex space-x-2">
                              <SvgInfo />

                              <p className="lg:hidden text-sm text-neutral-700 font-sans">info</p>
                            </span>
                          </Button>
                        )}
                      </Menu.Item>
                    </>
                  ) : null}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
    </>
  );
};
