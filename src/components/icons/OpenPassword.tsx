import * as React from 'react';

function SvgOpenPassword(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        clipRule="evenodd"
        d="M13.162 8.053a3.162 3.162 0 11-6.323-.001 3.162 3.162 0 016.323.001z"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M9.998 15.355c3.808 0 7.291-2.738 9.252-7.302C17.289 3.489 13.806.75 9.998.75h.004C6.194.75 2.711 3.489.75 8.053c1.961 4.564 5.444 7.302 9.252 7.302h-.004z"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgOpenPassword;
