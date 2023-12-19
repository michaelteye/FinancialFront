import * as React from 'react';

function SvgWithdrawal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity={0.1} cx={18.5} cy={18.5} r={18.5} fill="#F64" />
      <path
        opacity={0.2}
        d="M12.125 24a1.25 1.25 0 001.25 1.25h12.5a.624.624 0 00.625-.625v-8.75a.624.624 0 00-.625-.625h-12.5a1.25 1.25 0 01-1.25-1.25v10z"
        fill="#F64"
      />
      <path
        d="M12.125 14v10a1.25 1.25 0 001.25 1.25h12.5a.624.624 0 00.625-.625v-8.75a.624.624 0 00-.625-.625h-12.5a1.25 1.25 0 01-1.25-1.25zm0 0a1.25 1.25 0 011.25-1.25H24"
        stroke="#F64"
        strokeWidth={1.188}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23.063 21.188a.937.937 0 100-1.875.937.937 0 000 1.875z" fill="#F64" />
    </svg>
  );
}

export default SvgWithdrawal;
