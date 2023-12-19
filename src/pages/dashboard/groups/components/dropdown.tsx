import classNames from 'classnames';
import { Search } from '@/components/icons';
import { Spacer } from '@/components/spacer';
import { Transition } from '@headlessui/react';
import SvgCloseMini from '@/components/icons/CloseMini';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { DropDownProps } from '../lib/types';
import { convertToCodeNumber } from '../../settings/lib/index.t';

export const SelectedNameChip: React.FC<{ selectedName?: string; onClose?: () => void; noIcon?: boolean }> = ({
  selectedName,
  onClose,
  noIcon,
}) => {
  return (
    <li className="w-auto h-8 flex items-center justify-center px-2 text-sm list-none rounded-full mr-2 mt-1 bg-neutral-100">
      <div
        className={classNames('flex items-center mr-4', {
          'ml-2': noIcon,
        })}
      >
        {noIcon ? null : (
          <div className="mr-2">
            <DefaultIcon name={selectedName} selected />
          </div>
        )}

        <span className="text-sm">{selectedName}</span>
      </div>

      <button onClick={onClose}>
        <SvgCloseMini />
      </button>
    </li>
  );
};

export const DefaultIcon: React.FC<{ name?: string; selected?: boolean; idx?: any }> = ({ idx, name, selected }) => {
  const names = name?.split(' ');
  const firstInitials = names?.[0]?.substring(0, 1);
  const secondInitials = names?.[1]?.substring(0, 1);

  function resolveBgColor(idx: any) {
    if (idx === 0) {
      return 'bg-[#4B3869] ';
    }
    if (idx === 1) {
      return 'bg-[#333C83] ';
    }
    if (idx === 2) {
      return 'bg-[#0093AB] ';
    }

    return 'bg-[#544179]';
  }

  const initials = firstInitials! + secondInitials!;

  return (
    <div
      className={classNames(
        `flex items-center justify-center rounded-full font-medium text-white ${resolveBgColor(idx)}`,
        {
          'w-10 h-10': !selected,
          'w-6 h-6 text-xs': selected,
        }
      )}
    >
      {initials}
    </div>
  );
};

export const DropDown: React.FC<DropDownProps> = ({ id, open, noIcon, names, setOpen, label, subLabel, onChange }) => {
  const dropdown = useRef(null);
  const [nameSearch, setNameSearch] = useState('');
  const [filteredNames, setFilteredNames] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    setFilteredNames(
      names
        ? names.filter((name) => {
            return name?.toLowerCase().match(nameSearch.toLowerCase());
          })
        : []
    );
  }, [nameSearch]);

  useEffect(() => {
    if (selectedNames) {
      onChange?.(selectedNames);
    }
  }, [selectedNames]);

  useEffect(() => {
    let handler = (event: any) => {
      // @ts-ignore
      if (!dropdown?.current?.contains(event.target)) {
        setOpen?.(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  });

  const removeChip = (idxOfName: any) => {
    setSelectedNames(selectedNames?.filter((name, idx) => idx !== idxOfName));
  };

  return (
    <>
      <label className="font-sans font-semibold text-sm text-neutral-400" htmlFor="dropdown">
        {label}
      </label>
      <Spacer className="h-1" />

      <p className="font-sans text-sm text-neutral-400">{subLabel}</p>

      <Spacer className="h-1" />

      <div className="relative">
        <div className="absolute top-4 left-4">{open ? null : <Search />}</div>

        <div className="flex items-start flex-wrap min-h-[48px] px-12 py-0 border border-[#E3E6EA] rounded-lg">
          <ul className="flex flex-wrap mt-1">
            {selectedNames.map((selected, idx) => {
              return (
                <SelectedNameChip
                  key={idx}
                  noIcon={noIcon}
                  onClose={() => {
                    removeChip(idx);
                  }}
                  selectedName={selected}
                />
              );
            })}
          </ul>

          <input
            id={id}
            type="text"
            value={nameSearch}
            placeholder="Search Members"
            className="border-none h-12 w-1/2 text-sm pt-1 focus:outline-none"
            onKeyDown={(event: any) => {
              if (event.key === 'Enter' && event.target.value !== '') {
                setSelectedNames([...selectedNames, convertToCodeNumber(event.target?.value)]);
                setNameSearch('');
              }
            }}
            onChange={(event) => {
              if (event.target.value === '') {
                setOpen?.(false);
              } else {
                setOpen?.(true);
              }
              setNameSearch(event.target.value);
            }}
          />
        </div>
      </div>

      {open ? (
        <div ref={dropdown} className="flex flex-col items-center">
          <div className="w-full overflow-y-auto max-h-[250px] z-40">
            <Transition
              as={Fragment}
              enter="transition-opacity duration-[400ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="bg-[#F9FAFB] flex flex-col rounded-md mt-1 cursor-pointer">
                {(nameSearch ? filteredNames : names)?.map((name, idx) => {
                  return (
                    <button
                      key={idx}
                      disabled={selectedNames.includes(name)}
                      className="hover:bg-neutral-100 px-8 py-3 rounded-md"
                      onClick={() => {
                        setSelectedNames([...selectedNames, name]);
                      }}
                    >
                      <div className="flex lg:flex-row flex-col items-center justify-between">
                        {noIcon ? null : (
                          <div className="flex items-center">
                            <DefaultIcon name={name} />
                            <span className="ml-3">{name}</span>
                          </div>
                        )}
                        {selectedNames.includes(name) ? (
                          <div className="text-sm text-white font-sans-body bg-primary-100 px-3 py-1 rounded-2xl">
                            Already Added
                          </div>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Transition>
          </div>
        </div>
      ) : null}
    </>
  );
};
