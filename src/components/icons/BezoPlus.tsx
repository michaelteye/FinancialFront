import * as React from 'react';

function SvgBezoPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.875 10H3.125M10 16.875V3.125" stroke="#5E74DF" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default SvgBezoPlus;
