import React from 'react';
import classNames from 'classnames';
import { ChevronLeft } from '@/components/icons';
import usePagination from 'headless-pagination-react';

export const Paginator: React.FC<{ paginator: ReturnType<typeof usePagination> }> = ({ paginator }) => {
  const className = 'sm:w-10 sm:h-10 w-8 h-8 font-semibold rounded-lg flex items-center justify-center transition';

  return (
    <ul className="list-reset flex my-6 space-x-4 sm:mx-0 mx-auto">
      <li>
        <button
          className={classNames(className, {
            'text-neutral-200 cursor-not-allowed': !paginator.hasPrevious,
            'hover:bg-neutral-100 hover:text-primary-400 cursor-pointer ': paginator.hasPrevious,
          })}
          disabled={!paginator.hasPrevious}
          onClick={paginator.onPrevious}
        >
          <ChevronLeft />
        </button>
      </li>
      {paginator.links.map((link, idx) => (
        <li key={`${link.label}-${idx}`}>
          <button
            onClick={() => {
              if (link.active) {
                return;
              }
              if (link.label === '...') {
                return;
              }

              paginator.setPage(parseInt(link.label as string));
            }}
            className={classNames(className, ' hover:text-primary-400', {
              'cursor-pointer hover:bg-neutral-100': link.label !== '...',
              'cursor-default': link.label === '...',
              'bg-neutral-100 text-primary-400': link.active,
            })}
          >
            {link.label}
          </button>
        </li>
      ))}
      <li>
        <button
          className={classNames(className, {
            'text-neutral-200 cursor-not-allowed': !paginator.hasNext,
            'hover:bg-neutral-100 hover:text-primary-400 cursor-pointer ': paginator.hasNext,
          })}
          disabled={!paginator.hasNext}
          onClick={paginator.onNext}
        >
          <ChevronLeft className="transform rotate-180" />
        </button>
      </li>
    </ul>
  );
};
