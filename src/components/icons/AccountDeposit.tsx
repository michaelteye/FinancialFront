import * as React from 'react';

function SvgAccountDeposit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={42} height={42} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 15.75C0 7.052 7.052 0 15.75 0h10.5C34.949 0 42 7.052 42 15.75v10.5C42 34.949 34.949 42 26.25 42h-10.5C7.052 42 0 34.949 0 26.25v-10.5z"
        fill="#25BCAC"
        opacity={0.1}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.996 17.375h-4.234c-1.97.004-3.567 1.56-3.57 3.482-.004 1.925 1.595 3.489 3.57 3.491H31v.306C31 28.014 28.964 30 25.517 30h-9.033C13.036 30 11 28.014 11 24.654v-7.316C11 13.978 13.036 12 16.484 12h9.03c3.446 0 5.482 1.979 5.482 5.338v.037zm-15.256-.008H21.39a.756.756 0 00.762-.75.757.757 0 00-.769-.742H15.74a.756.756 0 00-.762.744.756.756 0 00.762.748z"
        fill="#25BCAC"
      />
      <path
        opacity={0.4}
        d="M25.037 21.297c.21.95 1.044 1.62 1.996 1.603h3.25a.726.726 0 00.717-.734v-2.532a.728.728 0 00-.718-.734h-3.326c-1.083.003-1.958.902-1.956 2.01 0 .13.013.26.037.387z"
        fill="#25BCAC"
      />
      <circle cx={27} cy={20.9} r={1} fill="#25BCAC" />
    </svg>
  );
}

export default SvgAccountDeposit;
