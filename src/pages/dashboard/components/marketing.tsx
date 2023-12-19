import classNames from 'classnames';
import { useApi } from '@/helpers/api';
import React, { Fragment } from 'react';
import { Button } from '@/components/button';
import { Spacer } from '@/components/spacer';
import { useNavigate } from 'react-router-dom';
import SvgClose from '@/components/icons/Close';
import { Dialog, Transition } from '@headlessui/react';
import xmasPic from '@assets/images/xmas.png';
export interface MarketingCampaign {
  createdAt?: string;
  description?: string;
  image?: string;
  link?: string;
  name?: string;
  status?: string;
  updatedAt?: string;
  _id?: string;
}

export const MarketingModal: React.FC<{
  open?: boolean;
  setOpen?: (open: boolean) => void;
  details?: MarketingCampaign;
}> = ({ open, setOpen, details }) => {
  const navigate = useNavigate();

  // const { submit: markCampaignAsRead } = useApi('/campaigns/read');

  function setToStorage() {
    const storedValue = localStorage.getItem('XMAS_CAMPAIGN');

    if (!storedValue) {
      localStorage.setItem('XMAS_CAMPAIGN', JSON.stringify(true));
      return;
    }
    return;
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classNames('fixed z-40 top-0 left-0 flex justify-center items-center inset-0')}
        onClose={() => {
          // setOpen?.(false);
          // setToStorage();
        }}
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-20" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={classNames(
                'flex justify-center w-full mx-auto align-middle transition-all transform px-4 lg:px-0'
              )}
            >
              <div className={classNames('w-full bg-white shadow-xl ')}>
                <div className="rounded-2xl flex flex-col w-full">
                  <div className="w-full rounded-t-2xl flex justify-between items-center px-7 pt-8 relative">
                    <p className="font-sans font-semibold text-[#252525]">Whats New ⚡ ✨</p>

                    <button>
                      <SvgClose
                        className=""
                        onClick={() => {
                          setOpen?.(false);
                          setToStorage();
                        }}
                      />
                    </button>
                  </div>

                  <Spacer className="h-4" />

                  <div className="border-t border-b border-neutral-100 flex flex-col justify-center px-7">
                    <Spacer className="h-4" />

                    <img src={xmasPic} alt="marketing" className="rounded-lg" />
                    <Spacer className="h-4" />

                    <div className="bg-neutral-100 px-4">
                      <p className="text-lg font-sans text-neutral-400 capitalize">X-MAS SAVINGS MARATHON</p>
                    </div>

                    <Spacer className="h-4" />
                  </div>

                  <Spacer className="h-4" />

                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        // navigate('/dashboard/campaigns');
                        setToStorage();
                      }}
                    >
                      Learn more
                    </Button>
                  </div>

                  <Spacer className="h-4" />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
