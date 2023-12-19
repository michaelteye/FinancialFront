import * as React from 'react';

function SvgLeftArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 13L5 8l5-5" stroke="#213353" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SvgLeftArrow;
