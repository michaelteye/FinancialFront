import * as React from 'react';

function SvgSavingsSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 3.75a.75.75 0 000-1.5h-3.045c-1.837 0-3.276 0-4.419.124-1.165.126-2.11.388-2.916.974A5.75 5.75 0 003.348 4.62c-.586.807-.848 1.75-.974 2.916-.124 1.143-.124 2.582-.124 4.419v.09c0 1.837 0 3.276.124 4.418.126 1.166.388 2.11.974 2.917a5.75 5.75 0 001.272 1.272c.807.586 1.75.848 2.916.974 1.143.124 2.582.124 4.419.124h.09c1.837 0 3.276 0 4.418-.124 1.166-.126 2.11-.388 2.917-.974a5.749 5.749 0 001.272-1.272c.586-.807.848-1.75.974-2.916.124-1.143.124-2.582.124-4.419V9a.75.75 0 00-1.5 0v3c0 1.892-.001 3.25-.115 4.302-.113 1.038-.328 1.688-.697 2.196-.262.36-.58.678-.94.94-.508.37-1.158.585-2.196.697-1.052.114-2.41.115-4.302.115-1.892 0-3.25-.001-4.302-.115-1.038-.113-1.688-.328-2.196-.697a4.25 4.25 0 01-.94-.94c-.37-.508-.585-1.158-.697-2.196-.114-1.052-.115-2.41-.115-4.302 0-1.892.001-3.25.115-4.302.112-1.038.328-1.688.697-2.196.262-.36.58-.678.94-.94.508-.37 1.158-.585 2.196-.697C8.75 3.751 10.108 3.75 12 3.75h3z"
        fill="#2D264B"
      />
      <path
        d="M6.327 14.527a.75.75 0 001.346.66l1.46-2.977c.453-.922 1.784-.877 2.173.074.879 2.149 3.884 2.25 4.907.166l1.46-2.977a.75.75 0 00-1.346-.66l-1.46 2.977c-.453.922-1.784.877-2.173-.074-.879-2.149-3.884-2.25-4.907-.166l-1.46 2.977z"
        fill="#2D264B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 4a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM19 4a1 1 0 102 0 1 1 0 00-2 0z"
        fill="#2D264B"
      />
    </svg>
  );
}

export default SvgSavingsSearch;