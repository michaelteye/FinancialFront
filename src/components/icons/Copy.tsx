import * as React from 'react';

function SvgCopy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={15} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#copy_svg__clip0_207_881)">
        <path
          d="M12.656 1.875h-7.5a.469.469 0 00-.468.469v2.344H2.344a.469.469 0 00-.469.468v7.5a.469.469 0 00.469.469h7.5a.469.469 0 00.469-.469v-2.344h2.343a.469.469 0 00.469-.468v-7.5a.469.469 0 00-.469-.469zm-.469 7.5h-1.874V5.156a.469.469 0 00-.47-.468H5.626V2.813h6.563v6.562z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="copy_svg__clip0_207_881">
          <rect width={15} height={15} rx={7.5} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgCopy;
