import * as React from 'react';

function SvgArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.542 10c0-.345.28-.625.625-.625h11.666a.625.625 0 110 1.25H4.167A.625.625 0 013.542 10z"
        fill="#3D58D9"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.558 3.725a.625.625 0 01.884 0l5.833 5.833a.625.625 0 010 .884l-5.833 5.833a.625.625 0 11-.884-.884L14.95 10 9.558 4.608a.625.625 0 010-.883z"
        fill="#3D58D9"
      />
    </svg>
  );
}

export default SvgArrow;
