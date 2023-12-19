import * as React from 'react';

function SvgStore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path opacity={0.2} d="M12 12v2a4 4 0 11-8 0v-2M28 12v2a4 4 0 11-8 0v-2" fill="#5E74DF" />
      <path
        d="M6 17.449V26a1 1 0 001 1h18a1 1 0 001-1V17.45M6.754 5h18.492a1 1 0 01.961.725L28 12H4l1.793-6.275A1 1 0 016.754 5z"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12v2a4 4 0 11-8 0v-2M20 12v2a4 4 0 11-8 0v-2M28 12v2a4 4 0 11-8 0v-2"
        stroke="#5E74DF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgStore;
