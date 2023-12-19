import * as React from 'react';

function SvgUmbrella(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
      <path
        opacity={0.2}
        d="M16 4a13.001 13.001 0 0112.955 11.911A1.002 1.002 0 0127.958 17H21c0-9-5-13-5-13zM16 4A13.001 13.001 0 003.045 15.911 1.002 1.002 0 004.042 17H11c0-9 5-13 5-13z"
        fill="#5E74DF"
      />
      <path
        d="M22 25a3 3 0 01-6 0v-8M4.042 17a1.003 1.003 0 01-.997-1.089 13 13 0 0125.91 0A1.002 1.002 0 0127.958 17H4.042z"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17c0-9 5-13 5-13s5 4 5 13"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgUmbrella;
