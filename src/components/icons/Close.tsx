import * as React from 'react';

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M21.875 6.125l-15.75 15.75M21.875 21.875L6.125 6.125"
        stroke="#091E42"
        strokeWidth={1.688}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgClose;
