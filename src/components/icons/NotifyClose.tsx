import * as React from 'react';

function SvgNotifyClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.102 1.322a.75.75 0 10-1.06-1.06L5.681 4.62 1.322.26a.75.75 0 10-1.06 1.06l4.359 4.36-4.36 4.36a.75.75 0 001.06 1.061l4.36-4.36 4.36 4.36a.75.75 0 001.061-1.06l-4.36-4.36 4.36-4.36z"
        fill="#1A1A25"
      />
    </svg>
  );
}

export default SvgNotifyClose;
