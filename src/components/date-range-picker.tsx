import Flatpickr from 'react-flatpickr';

import '@/styles/flatpickr.css';
import { FunctionComponent } from 'react';
import { Calendar } from '@/components/icons';
import { DateRangePickerProps } from './types';

export const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({ value, onChange, className }) => {
  return (
    <div className="relative">
      <Flatpickr
        options={{
          mode: 'range',
        }}
        className={`flex rounded-xl border pl-10 h-11 text-neutral-700 placeholder-neutral-700 bg-neutral-100 w-full border-[#161617] border-opacity-5 px-3 bg-opacity-30 items-center ${className}`}
        value={value}
        placeholder="(DD-MM-YYYY) To (DD-MM-YYYY)"
        onChange={onChange}
      />
      <Calendar className="absolute top-4 left-3" />
    </div>
  );
};
