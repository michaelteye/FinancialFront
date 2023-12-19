import * as React from 'react';

function SvgWithdrawalReceipt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={36} height={36} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 10C0 4.477 4.477 0 10 0h16c5.523 0 10 4.477 10 10v16c0 5.523-4.477 10-10 10H10C4.477 36 0 31.523 0 26V10z"
        fill="#BCD7DE"
        fillOpacity={0.3}
      />
      <path
        d="M28.222 30l-1.39-1.389L25.445 30l-1.389-1.389L22.666 30l-1.389-1.389L19.888 30 18.5 28.611 17.11 30l-1.388-1.389L14.332 30l-1.388-1.389L11.555 30l-1.389-1.389L8.777 30V5l1.39 1.389L11.525 5l1.418 1.389L14.362 5l1.36 1.389L17.14 5l1.36 1.389L19.946 5l1.331 1.389L22.753 5l1.302 1.389L25.415 5l1.418 1.389L28.222 5v25z"
        fill="#CCD6DD"
      />
      <path
        d="M19.194 16.805h-6.945a.696.696 0 01-.694-.695c0-.381.312-.694.694-.694h6.945c.382 0 .694.313.694.694a.696.696 0 01-.694.695zm5.555 0h-2.778a.696.696 0 01-.694-.695c0-.381.312-.694.694-.694h2.778c.382 0 .695.313.695.694a.696.696 0 01-.695.695zm-5.555 2.778h-6.945a.696.696 0 01-.694-.695c0-.382.312-.694.694-.694h6.945c.382 0 .694.312.694.694a.696.696 0 01-.694.695zm5.555 0h-2.778a.697.697 0 01-.694-.695c0-.382.312-.694.694-.694h2.778c.382 0 .695.312.695.694a.697.697 0 01-.695.695zm0 4.166h-12.5a.696.696 0 01-.694-.694c0-.382.312-.695.694-.695h12.5c.382 0 .695.313.695.695a.696.696 0 01-.695.694zm0 2.778h-2.778a.696.696 0 01-.694-.694c0-.382.312-.695.694-.695h2.778c.382 0 .695.313.695.695a.696.696 0 01-.695.694zM18.5 13.333a2.778 2.778 0 100-5.556 2.778 2.778 0 000 5.556z"
        fill="#99AAB5"
      />
    </svg>
  );
}

export default SvgWithdrawalReceipt;
