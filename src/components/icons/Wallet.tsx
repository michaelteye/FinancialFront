import * as React from 'react';

function SvgWallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.996 5.375h-4.234c-1.97.004-3.567 1.56-3.57 3.482-.004 1.925 1.595 3.489 3.57 3.491H20v.306C20 16.014 17.964 18 14.517 18H5.484C2.036 18 0 16.014 0 12.654V5.338C0 1.978 2.036 0 5.484 0h9.03c3.446 0 5.482 1.979 5.482 5.338v.037zM4.74 5.367H10.39a.756.756 0 00.762-.75.757.757 0 00-.769-.742H4.74a.756.756 0 00-.762.744.756.756 0 00.762.748z"
        fill="#25BCAC"
      />
      <path
        opacity={0.4}
        d="M14.037 9.297c.21.95 1.043 1.62 1.996 1.603h3.25a.726.726 0 00.717-.734V7.634a.728.728 0 00-.718-.734h-3.326c-1.083.003-1.958.902-1.956 2.01 0 .13.013.26.037.387"
        fill="#25BCAC"
      />
      <circle cx={16} cy={8.9} r={1} fill="#25BCAC" />
    </svg>
  );
}

export default SvgWallet;
