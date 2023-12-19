import * as React from 'react';

function SvgReferalBonus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity={0.05} cx={18.5} cy={18.5} r={18.5} fill="#FFAB00" />
      <path
        d="M25.875 15.25h-13.75a.625.625 0 00-.625.625v2.5c0 .345.28.625.625.625h13.75c.345 0 .625-.28.625-.625v-2.5a.625.625 0 00-.625-.625zM25.25 19v5.625a.624.624 0 01-.625.625h-11.25a.624.624 0 01-.625-.625V19M19 15.25v10M22.535 14.366c-.883.884-3.535.884-3.535.884s0-2.652.884-3.536a1.875 1.875 0 012.651 2.652v0zM15.464 14.366c.884.884 3.536.884 3.536.884s0-2.652-.884-3.536a1.875 1.875 0 00-2.652 2.652v0z"
        stroke="#FFAB00"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity={0.2}
        d="M25.25 19v5.625a.624.624 0 01-.625.625h-11.25a.624.624 0 01-.625-.625V19h12.5z"
        fill="#FFAB00"
      />
    </svg>
  );
}

export default SvgReferalBonus;
