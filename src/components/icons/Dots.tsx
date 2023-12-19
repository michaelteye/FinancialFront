import * as React from 'react';

function SvgDots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM24 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 17.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#000"
      />
    </svg>
  );
}

export default SvgDots;
