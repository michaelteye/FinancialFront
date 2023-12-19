import classNames from 'classnames';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import CaretDown from '../public/svgs/caret-down.svg';

export const BreadCrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const crumbs = location.pathname.replace('/dashboard', 'BezoSusu').split('/') || [];

  return (
    <div className="flex items-center space-x-1">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        const isFirst = idx === 0;

        return (
          <button
            key={idx}
            onClick={() => {
              if (isLast) {
                return;
              }
              if (isFirst) {
                navigate(`/dashboard/home`);
                return;
              }
              navigate(`/dashboard/${crumb}`);
            }}
            className={classNames('flex items-center text-sm space-x-1 font-sans-body font-semibold', {
              'font-sans cursor-not-allowed': isLast,
            })}
          >
            <span>{crumb.length > 6 && idx > 1 ? crumb.substring(0, 6) + '...' : crumb}</span>
            <span className={`${isLast ? 'hidden' : ''}`}>/</span>
          </button>
        );
      })}
    </div>
  );
};
