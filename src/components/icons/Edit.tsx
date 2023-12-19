import * as React from 'react';

function SvgEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 16.875H3.75a.625.625 0 01-.625-.625v-3.491a.625.625 0 01.183-.442l9.375-9.375a.625.625 0 01.884 0l3.491 3.491a.625.625 0 010 .884L7.5 16.875zM10.625 5L15 9.375"
        stroke="#000"
        strokeWidth={1.219}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.875 16.875H7.5L3.165 12.54"
        stroke="#000"
        strokeWidth={1.219}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgEdit;
