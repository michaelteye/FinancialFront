import * as React from 'react';

function SvgSmallPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.5 8h11M8 2.5v11" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SvgSmallPlus;
