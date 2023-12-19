import * as React from 'react';

function SvgSettings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={57} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={57} height={37} rx={18.5} fill="#ECF1F4" />
      <path
        d="M29 22.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
        stroke="#213353"
        strokeWidth={1.375}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.6 12.45l-1.474-1.105a.626.626 0 00-.561-.098c-.457.143-.9.326-1.324.548a.624.624 0 00-.329.466l-.26 1.824a6.653 6.653 0 00-.567.567h0l-1.824.26a.625.625 0 00-.465.329 8.071 8.071 0 00-.549 1.323.625.625 0 00.097.561L22.45 18.6a6.65 6.65 0 000 .801h0l-1.105 1.474a.626.626 0 00-.098.561c.143.457.326.9.548 1.324a.624.624 0 00.466.328l1.824.261a6.653 6.653 0 00.567.567h0l.26 1.824a.625.625 0 00.329.465c.423.222.866.405 1.323.549a.625.625 0 00.561-.097L28.6 25.55a6.647 6.647 0 00.801 0h0l1.474 1.105a.626.626 0 00.561.098c.457-.144.9-.327 1.324-.548a.626.626 0 00.328-.466l.261-1.824a6.653 6.653 0 00.567-.567h0l1.824-.26a.625.625 0 00.465-.329c.222-.424.405-.866.549-1.323a.625.625 0 00-.097-.562l-1.106-1.474a6.647 6.647 0 000-.801h0l1.105-1.474a.626.626 0 00.098-.561 8.076 8.076 0 00-.548-1.324.626.626 0 00-.466-.329l-1.824-.26a6.653 6.653 0 00-.567-.567h0l-.26-1.824a.625.625 0 00-.329-.465 8.071 8.071 0 00-1.323-.549.625.625 0 00-.562.097l-1.474 1.106a6.65 6.65 0 00-.801 0h0z"
        stroke="#213353"
        strokeWidth={1.375}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgSettings;
