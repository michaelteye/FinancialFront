import * as React from 'react';

function SvgCsvUpload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={67} height={67} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.736 25.57a1.5 1.5 0 010 3H23.87A5.875 5.875 0 0018 34.436v9.75a5.875 5.875 0 005.87 5.87h22.26a5.876 5.876 0 005.87-5.87V34.42a5.856 5.856 0 00-5.848-5.85h-1.886a1.5 1.5 0 010-3h1.886c4.878 0 8.848 3.97 8.848 8.85v9.768c0 4.892-3.98 8.87-8.87 8.87H23.87c-4.89 0-8.87-3.978-8.87-8.87v-9.75c0-4.89 3.98-8.868 8.87-8.868h1.866zm10.325-13.146l5.832 5.857a1.5 1.5 0 01-2.124 2.116l-3.271-3.283.001 21.95h-3l-.001-21.95-3.267 3.282a1.493 1.493 0 01-2.12.004 1.498 1.498 0 01-.004-2.12l5.83-5.856c.562-.566 1.562-.566 2.124 0z"
        fill="#2138A8"
      />
      <rect width={67} height={67} rx={20} fill="#C6D5DE" fillOpacity={0.3} />
    </svg>
  );
}

export default SvgCsvUpload;
