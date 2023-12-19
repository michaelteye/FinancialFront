import * as React from 'react';

function SvgTrophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        opacity={0.2}
        d="M7 7v6.887c0 4.963 3.97 9.076 8.932 9.113A8.999 8.999 0 0025 14V7a1 1 0 00-1-1H8a1 1 0 00-1 1z"
        fill="#5E74DF"
      />
      <path
        d="M7 7v6.887c0 4.963 3.97 9.076 8.932 9.113A8.999 8.999 0 0025 14V7a1 1 0 00-1-1H8a1 1 0 00-1 1zM12 28h8M16 23v5"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.777 16H26a4 4 0 004-4v-2a1 1 0 00-1-1h-4M7.246 16H5.984a4 4 0 01-4-4v-2a1 1 0 011-1h4"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgTrophy;
