import * as React from 'react';

function SvgFirstTopup(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={42} height={42} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 15.75C0 7.052 7.052 0 15.75 0h10.5C34.949 0 42 7.052 42 15.75v10.5C42 34.949 34.949 42 26.25 42h-10.5C7.052 42 0 34.949 0 26.25v-10.5z"
        fill="#5E74DF"
        opacity={0.1}
      />
      <path
        opacity={0.4}
        d="M19.81 17.203l-.327-3.7c0-.83.68-1.503 1.517-1.503a1.51 1.51 0 011.518 1.503l-.327 3.7c0 .65-.533 1.179-1.19 1.179-.66 0-1.191-.528-1.191-1.18z"
        fill="#5E74DF"
      />
      <path
        d="M19.87 29.625c-.059-.058-.305-.274-.51-.477-1.283-1.184-3.382-4.274-4.024-5.89-.103-.246-.32-.867-.336-1.2a2 2 0 01.22-.91c.203-.36.525-.649.904-.808.262-.101 1.05-.26 1.064-.26.86-.159 2.259-.245 3.805-.245 1.472 0 2.814.086 3.688.216.016.014.993.173 1.328.347.612.317.991.938.991 1.602v.058c-.014.433-.394 1.343-.408 1.343-.642 1.53-2.639 4.548-3.966 5.761 0 0-.342.343-.554.491a1.768 1.768 0 01-1.064.347c-.423 0-.816-.13-1.138-.375z"
        fill="#5E74DF"
      />
    </svg>
  );
}

export default SvgFirstTopup;
