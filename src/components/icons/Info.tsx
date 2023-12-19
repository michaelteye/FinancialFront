import * as React from 'react';

function SvgInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 17.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        stroke="#000"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.375 9.375H10v4.375h.625"
        stroke="#000"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 7.5a.937.937 0 100-1.875.937.937 0 000 1.875z" fill="#000" />
    </svg>
  );
}

export default SvgInfo;
