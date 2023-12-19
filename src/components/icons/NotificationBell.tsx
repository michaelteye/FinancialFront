import * as React from 'react';

function SvgNotificationBell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={46} height={46} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 19.08c0-6.607 0-9.911 1.265-12.444a12 12 0 015.371-5.37C9.17 0 12.473 0 19.08 0h7.84c6.607 0 9.911 0 12.444 1.265a12 12 0 015.37 5.371C46 9.17 46 12.473 46 19.08v7.84c0 6.607 0 9.911-1.266 12.444a12 12 0 01-5.37 5.37C36.83 46 33.527 46 26.92 46h-7.84c-6.607 0-9.911 0-12.444-1.266a12 12 0 01-5.37-5.37C0 36.83 0 33.527 0 26.92v-7.84z"
        fill="#F3F4F6"
      />
      <path
        d="M30.77 22.645c-.731-.853-1.063-1.592-1.063-2.848v-.427c0-1.637-.377-2.69-1.195-3.745C27.248 13.987 25.123 13 23.044 13h-.088c-2.037 0-4.095.942-5.379 2.513-.864 1.075-1.284 2.175-1.284 3.857v.427c0 1.256-.31 1.995-1.063 2.848-.553.629-.73 1.436-.73 2.31 0 .876.287 1.705.864 2.379a4.532 4.532 0 002.9 1.413 41.66 41.66 0 004.736.246c1.594 0 3.165-.112 4.737-.246a4.532 4.532 0 002.9-1.413 3.614 3.614 0 00.863-2.378c0-.875-.177-1.682-.73-2.31z"
        fill="#213353"
      />
      <path
        opacity={0.4}
        d="M25.009 30.228c-.5-.107-3.546-.107-4.046 0-.428.099-.89.329-.89.832.025.48.306.905.696 1.174h-.001a3.636 3.636 0 001.714.733c.33.045.666.043 1.008 0 .618-.09 1.21-.34 1.713-.733.39-.27.67-.693.695-1.174 0-.503-.462-.733-.89-.832z"
        fill="#213353"
      />
    </svg>
  );
}

export default SvgNotificationBell;