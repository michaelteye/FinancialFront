import * as React from 'react';

function SvgTotal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect y={0.029} width={36.826} height={36.826} rx={13.81} fill="#5E74DF" opacity={0.1} />
      <path
        opacity={0.4}
        d="M15.32 20.06l-2.495 2.09a1.325 1.325 0 00.009 1.873c.52.52 1.358.524 1.873.01l2.09-2.497a1.04 1.04 0 00-.007-1.47 1.039 1.039 0 00-1.47-.007"
        fill="#5E74DF"
      />
      <path
        d="M23.06 12.394c-.072 0-.36-.02-.612-.02-1.53-.062-4.747.553-6.147 1.157-.216.089-.736.338-.952.535-.197.197-.339.43-.428.7-.098.35-.077.728.06 1.062.1.225.489.812.498.821.435.632 1.249 1.552 2.208 2.511.912.913 1.797 1.691 2.42 2.153.018 0 .723.508 1.038.608a1.591 1.591 0 001.608-.38l.036-.035c.26-.277.588-1.077.58-1.085.55-1.347 1.183-4.456 1.113-6.031 0 0 0-.425-.04-.648a1.55 1.55 0 00-.444-.875 1.629 1.629 0 00-.938-.473"
        fill="#5E74DF"
      />
    </svg>
  );
}

export default SvgTotal;
