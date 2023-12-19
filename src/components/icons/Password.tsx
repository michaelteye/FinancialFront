import * as React from 'react';

function SvgPassword(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.76 14.367a3.123 3.123 0 01-.924-2.23A3.16 3.16 0 0112 8.973c.867 0 1.665.35 2.23.925M15.105 12.699a3.158 3.158 0 01-2.537 2.542"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.655 17.472c-1.587-1.246-2.931-3.066-3.905-5.335.984-2.279 2.337-4.109 3.934-5.365C8.271 5.516 10.102 4.834 12 4.834c1.909 0 3.739.692 5.336 1.957M19.448 8.99a15.358 15.358 0 011.802 3.147c-1.967 4.557-5.443 7.302-9.25 7.302-.863 0-1.714-.14-2.532-.413M19.887 4.25L4.113 20.023"
        stroke="#200E32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgPassword;
