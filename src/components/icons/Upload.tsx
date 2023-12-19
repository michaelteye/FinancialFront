import * as React from 'react';

function SvgUpload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 15v10m-5-5h10" stroke="#5C6278" strokeWidth={1.5} strokeLinecap="round" />
      <path
        d="M20 38.5C9.783 38.5 1.5 30.217 1.5 20h-3c0 11.874 9.626 21.5 21.5 21.5v-3zM38.5 20c0 10.217-8.283 18.5-18.5 18.5v3c11.874 0 21.5-9.626 21.5-21.5h-3zM20 1.5c10.217 0 18.5 8.283 18.5 18.5h3C41.5 8.126 31.874-1.5 20-1.5v3zm0-3C8.126-1.5-1.5 8.126-1.5 20h3C1.5 9.783 9.783 1.5 20 1.5v-3z"
        fill="#5C6278"
      />
    </svg>
  );
}

export default SvgUpload;
