import * as React from 'react';

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.459 10c0 .345-.28.625-.625.625H4.167a.625.625 0 110-1.25h11.666c.346 0 .626.28.626.625z"
        fill="#1A1A25"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.442 16.275a.625.625 0 01-.884 0l-5.833-5.833a.625.625 0 010-.884l5.833-5.833a.625.625 0 11.884.884L5.05 10l5.39 5.392a.625.625 0 010 .883z"
        fill="#1A1A25"
      />
    </svg>
  );
}

export default SvgArrowRight;
