import * as React from 'react';

function SvgCaretDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.625 6.75L9 12.375 3.375 6.75"
        stroke="#000"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgCaretDown;
