import { Button } from '@/components/button';
import SvgArrowRight from '@/components/icons/ArrowRight';
import { TopUp, Withdraw } from '@/components/icons';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useWidth } from '@/hooks/use-width';
import SvgDots from '@/components/icons/Dots';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { P2pSetup } from '../../bezo-wallet/p2p/p2p-setup';
import SvgBezoPlus from '@/components/icons/BezoPlus';
import useGoals from '@/hooks/fetch-goal';
import { ActionButtonsProps, ActionTypes, TopupWithdrawButtonsProps } from '../helpers/types';
import { SavingsOperations } from '../savings-transactions/topup-withdraw-savings/operations-setup';

export const ActionButtons: React.FunctionComponent<ActionButtonsProps> = ({
  onPrevious,
  onNext,
  onNextProps,
  onPreviousProps,
  loadingText,
  padding = '0',
  loading,
  continueText = 'continue',
  hideCancel,
  hideContinue,
  disabledContinue,
}) => {
  return (
    <div className={` w-full py-6 bg-white flex justify-end ${padding}`}>
      <div className="inline-flex space-x-4">
        {hideCancel ? null : (
          <Button {...onPreviousProps} variant="secondary" className="px-4 py-3" onClick={onPrevious}>
            <span className="flex space-x-2">
              <SvgArrowRight className=" mr-2" />
              go back
            </span>
          </Button>
        )}

        {hideContinue ? null : (
          <Button
            {...onNextProps}
            variant="primary"
            className="px-4 py-3 border border-neutral-900"
            loadingText={loadingText}
            loading={loading}
            onClick={onNext}
            disabled={disabledContinue}
          >
            {continueText}
          </Button>
        )}
      </div>
    </div>
  );
};

export const TopupWithdrawButtons: React.FC<TopupWithdrawButtonsProps> = ({
  topUpChild = 'Add money',
  removeWithdraw,
  removeIcon,
  noMobileChange,
  bezoWalletFund,
  fetchUserStats,
}) => {
  const width = useWidth();
  const location = useLocation();
  const { goals } = useGoals();
  const [searchParams] = useSearchParams();
  const [openP2p, setOpenP2p] = useState(false);
  const [fundBezoWallet, setFundBezoWallet] = useState(false);
  const [topUpSavingsGoal, setTopUpSavingsGoal] = useState(false);
  const [bezoWalletWithdrawal, setBezoWalletWithdrawal] = useState(false);
  const [withDrawFromSavingsGoal, setWithdrawFromSavingsGoal] = useState(false);

  useEffect(() => {
    if (!fetchUserStats){
      setOpenP2p(!!searchParams.get('p2p') === true);
    }
  }, []);

  const walletPage = location.pathname.split('/')[2] === 'wallet';

  return (
    <>
      <SavingsOperations
        open={topUpSavingsGoal}
        setOpen={setTopUpSavingsGoal}
        action={ActionTypes.TOPUP}
        savingGoals={goals}
      />

      <SavingsOperations
        open={fundBezoWallet}
        setOpen={setFundBezoWallet}
        action={ActionTypes.BEZOWALLETTOPUP}
        savingGoals={goals}
      />
      <SavingsOperations
        open={withDrawFromSavingsGoal}
        setOpen={setWithdrawFromSavingsGoal}
        action={ActionTypes.WITHDRAW}
        savingGoals={goals}
      />

      <SavingsOperations
        open={bezoWalletWithdrawal}
        setOpen={setBezoWalletWithdrawal}
        action={ActionTypes.BEZOWALLETWITHDRAW}
        savingGoals={goals}
      />

      <P2pSetup open={openP2p} setOpen={setOpenP2p} />

      {width >= EScreenBreakpoints.LG || noMobileChange || walletPage ? (
        <div
          className={classNames('flex space-x-2', {
            'w-full justify-between': walletPage,
          })}
        >
          {walletPage && !bezoWalletFund ? (
            <div className="flex flex-col sm:flex-row w-full items-center sm:space-x-2 sm:space-y-0 space-y-2">
              <Button
                onClick={() => setFundBezoWallet(true)}
                className="lg:px-6 px-3"
                isFullWidth={width < EScreenBreakpoints.MD}
                variant="tertiary"
              >
                <span className="flex lg:justify-between justify-center space-x-2 items-center">
                  <div>
                    <SvgBezoPlus />
                  </div>
                  <p className="lg:text-base text-xs">Fund Wallet</p>
                </span>
              </Button>
              <Button
                onClick={() => setBezoWalletWithdrawal(true)}
                variant="tertiary"
                isFullWidth={width < EScreenBreakpoints.MD}
                className="lg:px-6 px-3"
              >
                <span className="flex lg:justify-between justify-center space-x-2 items-center">
                  <div>
                    <TopUp className="text-primary-100 fill-current" />
                  </div>
                  <p className="font-sans text-xs lg:text-base">Withdraw</p>
                </span>
              </Button>
            </div>
          ) : null}

          {bezoWalletFund ? (
            <div className="flex items-center sm:space-x-2 sm:space-y-0 space-y-2 sm:flex-row flex-col w-full">
              <Button
                onClick={() => setTopUpSavingsGoal(true)}
                variant="tertiary"
                className="px-3 space-x-2 flex items-center justify-center"
                isFullWidth={width < EScreenBreakpoints.MD}
              >
                <span className="flex lg:justify-between sm:w-full justify-center space-x-2  items-center">
                  <div>
                    <SvgBezoPlus />
                  </div>
                  <p className="font-sans lg:text-base text-sm">Save Money</p>
                </span>
              </Button>

              <Button
                onClick={() => setOpenP2p(true)}
                className="flex items-center px-3 space-x-2 justify-center"
                isFullWidth={width < EScreenBreakpoints.MD}
                variant="tertiary"
              >
                <span className="flex lg:justify-between sm:w-full justify-center space-x-2  items-center">
                  <TopUp />
                  <p className="font-sans lg:text-base text-sm">Send Money</p>
                </span>
              </Button>
            </div>
          ) : null}

          {walletPage ? null : (
            <Button onClick={() => setTopUpSavingsGoal(true)} variant={removeIcon ? 'tertiary' : 'secondary'}>
              <span className="flex lg:justify-between justify-center space-x-2 items-center">
                {removeIcon ? null : <TopUp />}

                <p className="lg:text-base text-xs">{topUpChild}</p>
              </span>
            </Button>
          )}
          {removeWithdraw || walletPage ? null : (
            <Button onClick={() => setWithdrawFromSavingsGoal(true)} variant="secondary">
              <span className="flex lg:justify-between space-x-1 items-center">
                <Withdraw />
                <p className="lg:text-base text-xs">Withdraw</p>
              </span>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          {walletPage ? (
            <Button onClick={() => setFundBezoWallet(true)} variant="secondary">
              <span className="flex lg:justify-between justify-center space-x-2 items-center">
                <TopUp />

                <p className="lg:text-base text-xs">Fund BezoWallet</p>
              </span>
            </Button>
          ) : null}
          <div className=" relative ">
            <Menu as="div">
              <Menu.Button className="flex font-sans border border-[#161617] border-opacity-5 p-2 rounded-xl text-sm text-neutral-500 items-center bg-none ml-2">
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
                <Menu.Items className="flex flex-col space-y-2 px-6 py-6 absolute -right-2 w-48 origin-top-right bg-white rounded-md shadow-xl ">
                  <Menu.Item>
                    {() => (
                      <Button onClick={() => setTopUpSavingsGoal(true)} variant={removeIcon ? 'tertiary' : 'secondary'}>
                        <span className="flex lg:justify-between space-x-2 text-left items-center">
                          {removeIcon ? null : <TopUp />}

                          <p className="lg:text-base text-xs">{topUpChild}</p>
                        </span>
                      </Button>
                    )}
                  </Menu.Item>

                  {walletPage ? null : (
                    <Menu.Item>
                      {() => (
                        <Button onClick={() => setWithdrawFromSavingsGoal(true)} variant="secondary">
                          <span className="flex lg:justify-between space-x-1 items-center">
                            <Withdraw className=" " />
                            <p className="lg:text-base text-xs">Withdraw</p>
                          </span>
                        </Button>
                      )}
                    </Menu.Item>
                  )}
                  {walletPage ? (
                    <Menu.Item>
                      {() => (
                        <Button onClick={() => setBezoWalletWithdrawal(true)} variant="secondary">
                          <span className="flex lg:justify-between justify-center space-x-2 items-center">
                            <TopUp />

                            <p className="lg:text-base text-xs">Withdraw Cash</p>
                          </span>
                        </Button>
                      )}
                    </Menu.Item>
                  ) : null}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};
