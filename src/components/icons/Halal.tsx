import * as React from 'react';

function SvgHalal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity={0.2} d="M16 19c7.18 0 13-2.686 13-6s-5.82-6-13-6S3 9.686 3 13s5.82 6 13 6z" fill="#5E74DF" />
      <path
        d="M16 19c7.18 0 13-2.686 13-6s-5.82-6-13-6S3 9.686 3 13s5.82 6 13 6zM16 19v6"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 13v6c0 3 5 6 13 6s13-3 13-6v-6M24 17.763v6M8 17.763v6"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgHalal;
