import * as React from 'react';

function SvgReceipt2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity={0.2} d="M4 26V7a1 1 0 011-1h22a1 1 0 011 1v19l-4-2-4 2-4-2-4 2-4-2-4 2z" fill="#5E74DF" />
      <path
        d="M9.5 13h13M9.5 17h13M4 26V7a1 1 0 011-1h22a1 1 0 011 1v19l-4-2-4 2-4-2-4 2-4-2-4 2z"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgReceipt2;
