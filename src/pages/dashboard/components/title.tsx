import React from 'react';
interface titleProps {
  title: string;
}
export const Title: React.FC<titleProps> = ({ title }) => {
  return (
    <div>
      <h1 className="font-sans font-medium lg:text-5xl text-[2.5rem] leading-14 text-neutral-800 capitalize">
        {title}
      </h1>
    </div>
  );
};
