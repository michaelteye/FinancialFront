import * as React from 'react';

function SvgArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.825 17.307a.626.626 0 01-.614-.638V4.764c0-.352.274-.638.614-.638.339 0 .614.286.614.638v11.905a.626.626 0 01-.614.638z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66 11.168a.655.655 0 010-.902l5.73-5.953c.24-.25.629-.25.869 0l5.73 5.953c.24.249.24.653 0 .902a.598.598 0 01-.868 0L9.825 5.666l-5.297 5.502a.598.598 0 01-.869 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgArrowUp;
