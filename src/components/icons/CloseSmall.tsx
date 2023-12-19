import * as React from 'react';

function SvgCloseSmall(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.813 2.188L2.188 7.811M7.813 7.813L2.188 2.188"
        stroke="#091E42"
        strokeWidth={1.688}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgCloseSmall;
