import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export interface NavItemProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  active: boolean;
  path?: string;
  close?: () => void;
  iconStyle?: string;
  titleStyle?: string;
  beta?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  title,
  active,
  beta,
  icon: Icon,
  path,
  close,
  titleStyle,
  iconStyle,
}) => {
  //@ts-ignore
  window.classnames = classnames;
  return (
    <NavLink to={`/dashboard/${path}`} onClick={close}>
      <nav
        className={classnames('flex lg:mr-0 ml-6 py-4 items-center', {
          'bg-yellow active bg-opacity-10 rounded-2xl lg:rounded-r-none rounded-l-2xl transition ease-linear': active,
        })}
      >
        <Icon
          className={classnames(`ml-6 fill-current ${iconStyle}`, {
            'text-primary-400': active,
            'text-[#3B6096]': !active,
          })}
        />

        <h3
          className={classnames(`font-sans ml-7 ${titleStyle}`, {
            'text-primary-400  text-lg font-semibold': active,
            'text-[#3B6096]': !active,
          })}
        >
          {title}
        </h3>
        {beta && <span className="ml-2 bg-yellow px-3 py-1 rounded-2xl text-sm text-white">Beta</span>}
      </nav>
    </NavLink>
  );
};
