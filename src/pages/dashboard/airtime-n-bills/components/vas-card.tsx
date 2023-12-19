import React from 'react';

export const VasCard: React.FC<{ img: any; name: string; onClick: () => void }> = ({ img, name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-3 px-3 my-4 bg-neutral-100 bg-opacity-30 sm:w-56 w-full flex flex-col space-y-3 justify-center items-center border border-neutral-100 rounded-lg transform hover:scale-105"
    >
      <div className="sm:w-[12.3rem] sm:h-[10.1rem]">
        <img src={img} alt="icon" />
      </div>
      <p className="font-sans text-lg text-center capitalize">{name === 'MTN' ? name : name.toLowerCase()}</p>
    </button>
  );
};
