import * as React from 'react';

function SvgOptions(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={26} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#091E42" d="M0 0h20.8v3.111H0zM0 8.111h26v3.111H0zM0 16.223h13.867v3.111H0z" />
    </svg>
  );
}
export default SvgOptions;
