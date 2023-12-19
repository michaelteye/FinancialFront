import * as React from 'react';

function SvgCheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={32} height={32} rx={16} fill="#E3FBE4" />
      <path
        d="M21.5 13l-7.333 7-3.667-3.5"
        stroke="#25BCAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"
        stroke="#25BCAC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgCheckCircle;
