import { format } from 'date-fns';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Select } from './select';

export interface BirthDateInputProps {
  value?: string;
  error?: string;
  className?: string;
  onChange?: (date: string) => void;
}

interface Month {
  name: string;
  value: string;
}

function getNumbersInRange(from: number, to: number): number[] {
  let range: number[] = [];

  let start = from;

  while (start <= to) {
    start++;

    range.push(start);
  }

  return range;
}

const monthsOfTheYear: Month[] = [
  {
    name: 'January',
    value: '01',
  },
  {
    name: 'February',
    value: '02',
  },
  {
    name: 'March',
    value: '03',
  },
  {
    name: 'April',
    value: '04',
  },
  {
    name: 'May',
    value: '05',
  },
  {
    name: 'June',
    value: '06',
  },
  {
    name: 'July',
    value: '07',
  },
  {
    name: 'August',
    value: '08',
  },
  {
    name: 'September',
    value: '09',
  },
  {
    name: 'October',
    value: '10',
  },
  {
    name: 'November',
    value: '11',
  },
  {
    name: 'December',
    value: '12',
  },
];

function isValidDate(date: Date) {
  return date.getTime() === date.getTime();
}

function resolveDateOfBirth(day: string, month: string, year: string) {
  return format(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)), 'yyyy-MM-dd');
}

type DateState = [string | undefined, string | undefined, string | undefined];

function getMonthFromDate(date: Date) {
  const month = date.getMonth() + 1;

  if (month <= 9) {
    return `0${month}`;
  }

  return month.toString();
}

function resolveDefaultDatePickerValue(value?: string): DateState {
  if (value) {
    let date = new Date(value);

    if (isValidDate(date)) {
      return [date.getDate().toString(), getMonthFromDate(date), date.getFullYear().toString()];
    }
  }

  return [undefined, undefined, undefined];
}

export const BirthDateInput: FunctionComponent<BirthDateInputProps> = ({ value, onChange, error }) => {
  const days = useMemo(() => getNumbersInRange(0, 30), []);
  const years = useMemo(() => getNumbersInRange(1940, 2010), []);
  const [[day, month, year], setDateOfBirth] = useState<DateState>(resolveDefaultDatePickerValue(value));

  useEffect(() => {
    if (day && month && year) {
      onChange?.(resolveDateOfBirth(day, month, year));
    }
  }, [day, month, year]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center space-x-2 w-full">
        <div className="w-1/3">
          <Select
            placeholder="Day"
            hideErrorMessage
            className="pl-1"
            value={day}
            options={days.map((day) => ({
              label: day.toString(),
              value: day.toString(),
            }))}
            onChange={(event) => {
              setDateOfBirth([event.target.value, month, year]);
            }}
            error={error}
          />
        </div>
        <div className="w-1/2">
          <Select
            placeholder="Month"
            hideErrorMessage
            className="pl-1"
            value={month}
            options={monthsOfTheYear.map((month) => ({
              label: month.name,
              value: month.value,
            }))}
            onChange={(event) => setDateOfBirth([day, event.target.value, year])}
            error={error}
          />
        </div>
        <div className="w-1/3">
          <Select
            placeholder="Year"
            hideErrorMessage
            value={year}
            className="pl-2"
            options={years.map((year) => ({
              label: year.toString(),
              value: year.toString(),
            }))}
            onChange={(event) => setDateOfBirth([day, month, event.target.value])}
            error={error}
          />
        </div>
      </div>

      {error ? <p className=" text-secondary-200 text-sm font-sans-body mt-2">{error}</p> : null}
    </div>
  );
};
