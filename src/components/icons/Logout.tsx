import * as React from 'react';

function SvgLogout(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.662.333c1.656 0 3.005 1.327 3.005 2.96v3.194h-4.07A.514.514 0 005.076 7c0 .28.23.513.523.513h4.07V10.7c0 1.634-1.35 2.967-3.02 2.967H3.347c-1.662 0-3.012-1.327-3.012-2.96V3.3C.334 1.66 1.691.333 3.352.333h3.31zM11.361 4.7a.51.51 0 01.726-.006l1.947 1.94a.51.51 0 010 .726L12.087 9.3c-.1.1-.233.154-.36.154a.515.515 0 01-.367-.88l1.067-1.06h-2.76V6.487h2.76l-1.066-1.06c-.2-.2-.2-.527 0-.727z"
        fill="#2138A8"
      />
    </svg>
  );
}

export default SvgLogout;
