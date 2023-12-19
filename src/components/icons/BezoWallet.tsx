import * as React from 'react';

function SvgBezowallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={22} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.352.25a5.478 5.478 0 015.483 5.47v8.56c0 3.022-2.46 5.47-5.483 5.47H5.65c-3.024 0-5.482-2.448-5.482-5.47V5.72A5.471 5.471 0 015.65.25h10.702zm1.225 5.633a.823.823 0 00-.608.217L12.085 10a1.697 1.697 0 01-2.167 0L5.043 6.1a.824.824 0 00-1.083.076.828.828 0 00-.077 1.083l.142.141 4.929 3.846a3.405 3.405 0 002.112.736c.768 0 1.517-.26 2.123-.736l4.887-3.911.086-.087a.838.838 0 00-.012-1.083.911.911 0 00-.573-.282z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgBezowallet;
