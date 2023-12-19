import * as React from 'react';

function SvgCloseGoal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity={0.1} cx={18.5} cy={18.5} r={18.5} fill="#FFAB00" />
      <path
        d="M18.856 29.083c6.042 0 10.94-4.898 10.94-10.94s-4.898-10.94-10.94-10.94-10.94 4.898-10.94 10.94 4.898 10.94 10.94 10.94z"
        stroke="#FF9314"
        strokeWidth={2.196}
        strokeMiterlimit={10}
      />
      <path
        d="M18.856 12.673v6.382"
        stroke="#FF9314"
        strokeWidth={2.196}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.155 23.157a1.299 1.299 0 11-2.598 0 1.299 1.299 0 012.598 0z"
        fill="#FF9314"
        stroke="#FF9314"
        strokeWidth={0.137}
      />
    </svg>
  );
}

export default SvgCloseGoal;
