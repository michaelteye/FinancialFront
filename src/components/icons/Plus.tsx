import * as React from 'react';

function SvgPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.688 15h20.625M15 4.688v20.625"
        stroke="#000"
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPlus;
