import * as React from 'react';

function SvgStarYellow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.345 13.901l3.94 2.496c.504.32 1.129-.155.98-.743l-1.139-4.478a.683.683 0 01.222-.694l3.533-2.94c.464-.387.225-1.158-.372-1.196l-4.614-.3a.658.658 0 01-.566-.418L9.608 1.294a.65.65 0 00-1.216 0l-1.72 4.334a.658.658 0 01-.567.418l-4.614.3c-.597.038-.836.809-.372 1.195l3.533 2.941a.684.684 0 01.222.694l-1.056 4.153c-.18.705.571 1.275 1.176.892l3.661-2.32a.641.641 0 01.69 0z"
        fill="#FFAB00"
        stroke="#FFAB00"
        strokeWidth={0.938}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgStarYellow;
