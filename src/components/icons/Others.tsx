import * as React from 'react';

function SvgOthers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        opacity={0.2}
        d="M4 15h7.101a.999.999 0 01.979.8 4.001 4.001 0 007.84 0 .998.998 0 01.979-.8H28V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6z"
        fill="#5E74DF"
      />
      <path
        d="M26 7H6a2 2 0 00-2 2v14a2 2 0 002 2h20a2 2 0 002-2V9a2 2 0 00-2-2z"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15h7.101a.999.999 0 01.979.8 4.001 4.001 0 007.84 0 .998.998 0 01.979-.8H28M4 11h24"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgOthers;
