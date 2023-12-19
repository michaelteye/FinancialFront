import * as React from 'react';

function SvgSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.063 15.625a6.562 6.562 0 100-13.125 6.562 6.562 0 000 13.125zM13.703 13.703L17.5 17.5"
        stroke="#213353"
        strokeWidth={1.313}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgSearch;
