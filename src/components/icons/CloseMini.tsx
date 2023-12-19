import * as React from 'react';

function SvgCloseMini(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={9} height={9} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.76 6.64L5.61 4.49l2.148-2.148a1.056 1.056 0 000-1.494A1.054 1.054 0 006.263.846l-2.15 2.149L1.965.844a1.06 1.06 0 00-1.496 0 1.06 1.06 0 000 1.496l2.15 2.15L.474 6.636a1.056 1.056 0 00.747 1.806c.272 0 .541-.103.748-.31l2.146-2.146 2.15 2.15A1.059 1.059 0 007.76 6.639z"
        fill="#213353"
      />
    </svg>
  );
}

export default SvgCloseMini;
