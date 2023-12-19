import * as React from 'react';

function SvgChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.571 11.143L1.43 6 6.57.857"
        stroke="#000"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgChevronLeft;
