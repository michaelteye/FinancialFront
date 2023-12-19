import SvgClose from '@/components/icons/Close';
import { Spacer } from '@/components/spacer';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { EditSavingsGoalForm } from './edit-saving-goal-form';

export const EditSavingGoal: React.FC<{ open?: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className={'fixed z-40 top-0 lg:w-[56.5%] w-full right-0'}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-20 z-[-10]" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-full transition-all transform bg-white shadow-xl h-screen p-8 lg:rounded-tl-3xl lg:rounded-bl-3xl overflow-auto">
                <div className="w-full flex items-center">
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <SvgClose className="mr-3" />
                  </button>

                  <h2 className="text-neutral-900 text-lg font-medium">Create Savings Goals</h2>
                </div>

                <Spacer className="h-12" />

                <EditSavingsGoalForm
                  setOpen={() => {
                    setOpen(false);
                  }}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
