import { Arrow, CheckCircle } from '@/components/icons';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: React.ReactNode;
  completed?: boolean;
  description: string;
  link: {
    title: string;
    href: string;
  };
}

export const Card: React.FC<CardProps> = ({ icon: Icon, title, description, link, completed }) => {
  let Wrapper = completed ? 'div' : Link;

  return (
    <Wrapper to={(completed ? undefined : link.href) as string}>
      <div
        className={classNames(
          'flex flex-col transition ease-linear px-5 border w-full lg:w-[300px] min-h-[281px] border-[#f3f2f8] rounded-lg py-7 bg-[#FCFCFD]',
          {
            'hover:shadow-lg ': !completed,}
        )}
      >
        <Icon
          className={classNames(' w-12 h-12', { 'welcome-card': !completed,})}
        />

        <p className=" font-medium font-sans leading-5.5 text-neutral-700 mt-2">{ title } </p>
        <p className=" font-sans-body text-3.5 text-[#808192] mt-101"> { description } </p>

        {completed ? (
          <div className="mt-4 flex items-center space-x-4">
            <span className="font-sans text-[#808192] text-sm font-medium"> Complete </span>
            <CheckCircle />
          </div>
        ) : (
          <Link
            to={link.href}
            className="mt-6 font-sans text-sm font-medium text-primary-200 flex items-center transition transform hover:translate-x-2"
          >
            {link.title}
            <Arrow className="ml-2" />
          </Link>
        )}
      </div>
    </Wrapper>
  );
};
