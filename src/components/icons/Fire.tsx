import * as React from 'react';

function SvgFire(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={15} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.75 8.141c0 2.506-1.25 5.609-6.25 5.609s-6.25-3.103-6.25-6.235 1.875-4.386 1.875-4.386c-.393.79-.044 2.073.269 2.917C4.59 1.729 9.375 1.25 9.375 1.25c-1.25.625-1.351 5.012.625 5.012 1.875 0 .625-2.506.625-2.506s3.125.627 3.125 4.385z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgFire;
