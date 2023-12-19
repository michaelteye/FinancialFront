import * as React from 'react';

function SvgMoreHorizontal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={14} height={4} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.15 2.869a.727.727 0 100-1.455.727.727 0 000 1.455zM12.24 2.869a.727.727 0 100-1.455.727.727 0 000 1.455zM2.059 2.869a.727.727 0 100-1.455.727.727 0 000 1.455z"
        stroke="#000"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgMoreHorizontal;
