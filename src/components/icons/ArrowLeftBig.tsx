import * as React from 'react';

function SvgArrowLeftBig(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={47} height={47} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M39.656 23.5H7.344M20.563 10.281L7.342 23.5l13.22 13.219"
        stroke="#000"
        strokeWidth={2.938}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgArrowLeftBig;
