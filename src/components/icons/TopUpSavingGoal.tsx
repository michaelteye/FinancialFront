import * as React from 'react';

function SvgTopUpSavingGoal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity={0.1} cx={18.5} cy={18.5} r={18.5} fill="#5E74DF" />
      <path
        opacity={0.2}
        d="M19 20.875c4.487 0 8.125-1.679 8.125-3.75 0-2.071-3.638-3.75-8.125-3.75s-8.125 1.679-8.125 3.75c0 2.071 3.638 3.75 8.125 3.75z"
        fill="#5E74DF"
      />
      <path
        d="M19 20.875c4.487 0 8.125-1.679 8.125-3.75 0-2.071-3.638-3.75-8.125-3.75s-8.125 1.679-8.125 3.75c0 2.071 3.638 3.75 8.125 3.75zM19 20.875v3.75"
        stroke="#5E74DF"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.875 17.125v3.75c0 1.875 3.125 3.75 8.125 3.75s8.125-1.875 8.125-3.75v-3.75M24 20.102v3.75M14 20.102v3.75"
        stroke="#5E74DF"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgTopUpSavingGoal;
