import * as React from 'react';

function SvgReceipt3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        opacity={0.2}
        d="M3 19.5V5.25a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75V19.5L18 18l-3 1.5-3-1.5-3 1.5L6 18l-3 1.5z"
        fill="#fff"
      />
      <path
        d="M7.125 9.75h9.75M7.125 12.75h9.75M3 19.5V5.25a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75V19.5L18 18l-3 1.5-3-1.5-3 1.5L6 18l-3 1.5z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgReceipt3;
