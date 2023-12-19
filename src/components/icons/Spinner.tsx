import * as React from 'react';

function SvgSpinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 4v4M24.485 7.515l-2.828 2.828M28 16h-4M24.485 24.486l-2.828-2.829M16 28v-4M7.515 24.486l2.828-2.829M4 16h4M7.515 7.515l2.828 2.828"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgSpinner;
