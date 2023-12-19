import * as React from 'react';

function SvgTopUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 16.459a.625.625 0 01-.625-.625V4.167a.625.625 0 111.25 0v11.666c0 .346-.28.626-.625.626z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.725 10.442a.625.625 0 010-.884l5.833-5.833a.625.625 0 01.884 0l5.833 5.833a.625.625 0 11-.884.884L10 5.05l-5.391 5.39a.625.625 0 01-.884 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgTopUp;
