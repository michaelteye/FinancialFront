import * as React from 'react';

function SvgBuildings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity={0.2} d="M18 26.998v-22a1 1 0 00-1-1H5a1 1 0 00-1 1v22" fill="#5E74DF" />
      <path
        d="M2 26.998h28M18 26.998v-22a1 1 0 00-1-1H5a1 1 0 00-1 1v22M28 26.998v-14a1 1 0 00-1-1h-9M8 8.998h4M10 16.998h4M8 21.998h4M22 21.998h2M22 16.998h2"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgBuildings;
