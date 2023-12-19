import * as React from 'react';

function SvgProfile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={12} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 9.116c2.892 0 5.333.47 5.333 2.284 0 1.813-2.457 2.267-5.334 2.267-2.891 0-5.333-.47-5.333-2.284 0-1.814 2.457-2.267 5.333-2.267zM6 .333c1.959 0 3.529 1.57 3.529 3.528a3.516 3.516 0 01-3.53 3.528A3.517 3.517 0 012.47 3.86 3.516 3.516 0 016 .333z"
        fill="#2138A8"
      />
    </svg>
  );
}

export default SvgProfile;
