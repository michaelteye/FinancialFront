import { Fragment } from 'react';
import { Spacer } from '@/components/spacer';
import SvgClose from '@/components/icons/Close';
import { ActionButtons } from './action-buttons';
import { Dialog, Transition } from '@headlessui/react';
import { CreateSavingsGoallayoutProps } from '../helpers/types';

export const CreateSavingsGoalLayout: React.FC<CreateSavingsGoallayoutProps> = ({
  open,
  closeModal,
  onNextProps,
  onNext,
  onPrevious,
  width = 'md:w-[56.5%]',
  onPreviousProps,
  buttonPosition,
  showActionButtons,
  hideGoBack,
  children,
  title = 'Create a savings goal',
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed z-40 top-0  w-full right-0 ${width}`}
        onClose={() => {
          if (closeModal) {
            closeModal();
          }
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
                    if (closeModal) {
                      closeModal();
                    }
                  }}
                >
                  <SvgClose className="mr-3" />
                </button>

                <h2 className="text-neutral-900 text-lg font-medium">{title}</h2>
              </div>

              {children}

              {showActionButtons ? (
                <>
                  <Spacer className="h-12" />

                  <ActionButtons
                    hideCancel={hideGoBack}
                    onNextProps={onNextProps}
                    onPreviousProps={onPreviousProps}
                    onNext={onNext}
                    position={buttonPosition}
                    onPrevious={onPrevious}
                  />

                  <Spacer className="h-20" />
                </>
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
