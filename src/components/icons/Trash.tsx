import * as React from 'react';

function SvgTrash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={57} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={57} height={37} rx={18.5} fill="#ECF1F4" />
      <path
        d="M35.875 13.375h-13.75M27.125 17.125v5M30.875 17.125v5M34.625 13.375V25.25a.624.624 0 01-.625.625H24a.624.624 0 01-.625-.625V13.375M32.125 13.375v-1.25a1.25 1.25 0 00-1.25-1.25h-3.75a1.25 1.25 0 00-1.25 1.25v1.25"
        stroke="#213353"
        strokeWidth={1.38}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgTrash;
