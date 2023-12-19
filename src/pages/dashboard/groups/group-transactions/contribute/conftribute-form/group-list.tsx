import classNames from 'classnames';
import { Spacer } from '@/components/spacer';
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { CaretDown } from '@/components/icons';
import { Input } from '@/components/input/input';
import { RadioInput } from '@/components/input/radio-input';
import { userGroup } from '../../../components/types';
import { useContributeContext } from '../contribute-context';

export default function GroupLists() {
  const [groupSearch, setGroupSearch] = useState('');
  const { selectedGroupGoal, groups } = useContributeContext();
  const [filteredGroups, setFilteredGroups] = useState<userGroup[]>([]);

  // for each group fetch its saving goals

  useEffect(() => {
    let ref;
    if (groups) {
      ref = groups?.map((group) => {
        return group.group?.ref_id;
      });
    }
  }, []);

  useEffect(() => {
    if (groups) {
      setFilteredGroups(
        groups.filter((group) => {
          return group?.group?.groupName.toLowerCase().match(groupSearch.toLowerCase());
        })
      );
    }
  }, [groupSearch]);

  if (true) {
    // TODO: Change this condition when we have the "Add contribution button on the groups page"
    return null;
  }

  return (
    <>
      <div className="px-7">
        <Input
          className="w-full rounded-lg pl-14 pr-7 py-4 focus:outline-none border border-neutral-200"
          type="search"
          placeholder="Search for your Group here.."
          onChange={(event) => setGroupSearch(event.target.value)}
        />
      </div>

      <Spacer className=" h-4" />

      <div className="flex flex-col border-b border-neutral-100 h-[220px] overflow-y-auto">
        {(groupSearch ? filteredGroups : groups)?.map((group) => {
          return (
            <div className="w-full px-4" key={group?.group?._id}>
              <div className="w-full p-2 rounded-2xl">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full p-4 text-sm text-left text-neutral-400 rounded-lg hover:bg-neutral-100 hover:bg-opacity-40">
                        <span className="capitalize">{group?.group?.groupName}</span>
                        <CaretDown className={`${open ? 'transform rotate-180' : ''}`} />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pb-2 text-sm">
                        <RadioInput
                          id={selectedGroupGoal?._id!}
                          text="Savings Goal List"
                          value="Savings Goal List"
                          name="saving-goal"
                          className={classNames(
                            'w-full rounded-none transition ease-linear bg-white hover:bg-neutral-100 hover:bg-opacity-40',
                            {
                              'bg-transparent': selectedGroupGoal?._id === selectedGroupGoal?._id,
                              'bg-white': selectedGroupGoal?._id !== selectedGroupGoal?._id,
                            }
                          )}
                          checked={selectedGroupGoal?._id === selectedGroupGoal?._id}
                          onChange={() => {}}
                        />
                        <RadioInput
                          id={selectedGroupGoal?._id!}
                          text="Savings Goal List"
                          value="Savings Goal List"
                          name="saving-goal"
                          className={classNames(
                            'w-full rounded-none transition ease-linear bg-white hover:bg-neutral-100 hover:bg-opacity-40',
                            {
                              'bg-transparent': selectedGroupGoal?._id === selectedGroupGoal?._id,
                              'bg-white': selectedGroupGoal?._id !== selectedGroupGoal?._id,
                            }
                          )}
                          checked={selectedGroupGoal?._id === selectedGroupGoal?._id}
                          onChange={() => {}}
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
