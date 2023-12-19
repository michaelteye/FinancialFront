import * as React from 'react';

function SvgPlusSm(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={13} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M.309.809H12.69V13.19H.31V.81z" stroke="#23D789" strokeWidth={0.117} />
      <path
        d="M2.203 7h8.594M6.5 2.703v8.594"
        stroke="#23D789"
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPlusSm;
