import * as React from 'react';

function SvgCaretUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.625 11.25L9 5.625 3.375 11.25"
        stroke="#000"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgCaretUp;
