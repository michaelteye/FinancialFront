import * as React from 'react';

function SvgOpenEye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
      <path
        fill="currentColor"
        d="M14 12c0 1.103-.897 2-2 2s-2-.897-2-2 .897-2 2-2 2 .897 2 2zm10-.449S19.748 19 12.015 19C4.835 19 0 11.551 0 11.551S4.446 5 12.015 5C19.709 5 24 11.551 24 11.551zM16 12a4 4 0 10-8.002.002A4 4 0 0016 12z"
      />
    </svg>
  );
}

export default SvgOpenEye;
