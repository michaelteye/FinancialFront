import { Button } from '@/components/button';
import { TopUp, Withdraw } from '@/components/icons';
import SvgClose from '@/components/icons/Close';
import SvgCsvUpload from '@/components/icons/CsvUpload';
import SvgDots from '@/components/icons/Dots';
import Modal from '@/components/modal/modal';
import { Spacer } from '@/components/spacer';
import { useApi } from '@/helpers/api';
import { EScreenBreakpoints } from '@/helpers/breakpoints';
import { useWidth } from '@/hooks/use-width';
import { useMessagesStore } from '@/store/messages';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateSavingsGoalLayout } from '../../savings/components/create-savings-goal-layout';
import { AddMembers } from '../create-group/add-members';
import { GroupModalLayout } from './modals/modal-layout';

export const AddMemberButtons: React.FC<{ groupName?: string; fetchInvites?: () => void }> = ({
  groupName,
  fetchInvites,
}) => {
  const width = useWidth();
  const params = useParams();
  const { displayMessage } = useMessagesStore();
  const [open, setOpen] = useState(false);
  const csvRef = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<any>({});
  const [openImportMembers, setOpenImportMembers] = useState(false);
  const { submit: importMembers, isLoading: isAddingMembers } = useApi('/user/groups/add-member', {
    onSuccess() {
      displayMessage({
        title: 'Success',
        description: 'Invites Successfully Sent',
        variant: 'success',
      });
      setFileData({});
      setOpenImportMembers(false);
    },
    onError(response) {
      displayMessage({
        title: 'Failed',
        description: response.response?.data.message,
        variant: 'error',
      });
      setFileData({});
      setOpenImportMembers(false);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('groupName', groupName!);
    formData.append('ref', params.refId!);
    formData.append('members', fileData);

    importMembers(formData);
  };

  return (
    <>
      <CreateSavingsGoalLayout
        title="Add Group Members"
        width="md:w-[45%]"
        open={open}
        closeModal={() => setOpen(false)}
      >
        <AddMembers
          groupName={groupName}
          closeModal={() => {
            setOpen(false);
          }}
          fetchInvites={fetchInvites}
        />
      </CreateSavingsGoalLayout>

      <Modal open={openImportMembers} setOpen={setOpenImportMembers} className="rounded-2xl max-w-[530px]">
        <>
          <div className="px-7 py-6 bg-neutral-100 flex  bg-opacity-60 rounded-t-2xl hover:bg-opacity-40">
            <div className="w-full items-center relative">
              <button
                className="absolute right-0"
                onClick={() => {
                  setOpenImportMembers(false);
                  setFileData({});
                }}
              >
                <SvgClose />
              </button>

              <Spacer className="h-8" />

              <button
                className="w-full flex flex-col space-y-4 justify-center items-center"
                onClick={() => {
                  csvRef.current?.click();
                }}
              >
                <div className="flex justify-center items-center">
                  <SvgCsvUpload />
                </div>

                {fileData.name ? (
                  <>
                    <p className="bg-neutral-100 text-sm font-sans-body px-4 py-2 rounded-md">{fileData.name}</p>
                  </>
                ) : null}

                <button className="font-sans text-neutral-500 text-sm border border-neutral-300 px-2 py-1 rounded-md">
                  {fileData.name ? 'Change File' : 'Upload file'}
                </button>
              </button>
            </div>
          </div>

          <Spacer className="h-8" />
        </>

        <div className="flex flex-col justify-center items-center">
          <p className="font-sans text-[#252525] text-3xl font-bold">Upload .csv file</p>

          <Spacer className="h-3" />

          <p className="text-[#252525] font-sans-body text-center px-10">
            Upload a .csv file containing Bezo susu user’s name and phone number.
          </p>

          <input
            ref={csvRef}
            type="file"
            name="csv file"
            className="hidden"
            accept=".csv, application/vnd.ms-excel"
            onChange={(event) => {
              setFileData(event?.target?.files?.[0]!);
            }}
          />
        </div>

        <Spacer className="lg:h-12 h-5" />

        <div className=" h-[2px] w-full bg-neutral-100 bg-opacity-60"></div>

        <Spacer className="h-8" />

        <div className="flex justify-center items-center">
          <Button loading={isAddingMembers} onClick={() => handleSubmit()} variant="primary" className={`px-4 py-3`}>
            Import File
          </Button>
        </div>
        <Spacer className="lg:h-7 h-5" />
      </Modal>

      {width >= EScreenBreakpoints.LG ? (
        <div className="flex space-x-2">
          <Button onClick={() => setOpen(true)} variant="secondary">
            <span className="flex lg:justify-between justify-center space-x-2 items-center">
              <TopUp />

              <p className="lg:text-base text-xs">Add Member(s)</p>
            </span>
          </Button>

          <Button onClick={() => setOpenImportMembers(true)} variant="secondary">
            <span className="flex lg:justify-between space-x-1 items-center">
              <TopUp />
              <p className="lg:text-base text-xs">Import Member List</p>
            </span>
          </Button>
        </div>
      ) : (
        <>
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
                <Menu.Items className="flex flex-col space-y-2 px-6 py-6 absolute -right-2 w-60 origin-top-right bg-white rounded-md shadow-xl">
                  <Menu.Item>
                    {() => (
                      <Button onClick={() => setOpen(true)} variant="secondary">
                        <span className="flex lg:justify-between justify-center space-x-2 items-center">
                          <TopUp />

                          <p className="lg:text-base text-xs">Add Member(s)</p>
                        </span>
                      </Button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {() => (
                      <Button onClick={() => setOpenImportMembers(true)} variant="secondary">
                        <span className="flex lg:justify-between space-x-1 items-center">
                          <TopUp />
                          <p className="lg:text-base text-xs">Import Member List</p>
                        </span>
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      )}
    </>
  );
};
