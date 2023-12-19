import * as React from 'react';

function SvgWithdraw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.542c.345 0 .625.28.625.625v11.666a.625.625 0 01-1.25 0V4.167c0-.346.28-.625.625-.625z"
        fill="#1A1A25"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.275 9.558a.625.625 0 010 .884l-5.833 5.833a.625.625 0 01-.884 0l-5.833-5.833a.625.625 0 11.884-.884L10 14.95l5.391-5.392a.625.625 0 01.884 0z"
        fill="#1A1A25"
      />
    </svg>
  );
}

export default SvgWithdraw;
