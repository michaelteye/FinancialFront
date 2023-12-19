import * as React from 'react';

function SvgWithdrawReceipt3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity={0.1} cx={18.5} cy={18.5} r={18.5} fill="#5E74DF" />
      <path
        d="M14.938 17.125h8.124M14.938 19.625h8.124M11.5 25.25V13.375a.624.624 0 01.625-.625h13.75a.624.624 0 01.625.625V25.25L24 24l-2.5 1.25L19 24l-2.5 1.25L14 24l-2.5 1.25z"
        stroke="#5E74DF"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgWithdrawReceipt3;
