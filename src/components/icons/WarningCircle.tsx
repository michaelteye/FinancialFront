import * as React from 'react';

function SvgWarningCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path d="M16 10v7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 23a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor" />
    </svg>
  );
}

export default SvgWarningCircle;
