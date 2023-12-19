import * as React from 'react';

function SvgCoin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={29} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        opacity={0.2}
        d="M14.703 17.337c6.307 0 11.419-2.36 11.419-5.27 0-2.91-5.112-5.27-11.419-5.27-6.306 0-11.419 2.36-11.419 5.27 0 2.91 5.113 5.27 11.42 5.27z"
        fill="#5E74DF"
      />
      <path
        d="M14.703 17.337c6.307 0 11.419-2.36 11.419-5.27 0-2.91-5.112-5.27-11.419-5.27-6.306 0-11.419 2.36-11.419 5.27 0 2.91 5.113 5.27 11.42 5.27zM14.703 17.337v5.27"
        stroke="#5E74DF"
        strokeWidth={1.757}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.284 12.067v5.27c0 2.636 4.392 5.27 11.42 5.27 7.026 0 11.418-2.634 11.418-5.27v-5.27M21.73 16.252v5.27M7.677 16.252v5.27"
        stroke="#5E74DF"
        strokeWidth={1.757}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgCoin;
