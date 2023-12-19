import * as React from 'react';

function SvgTreasuryBillsSm(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#treasury-bills-sm_svg__filter0_d_2298_57593)" fill="currentColor">
        <path d="M11.131.14c-.136.151-.13.14-.855 3.05-.243.973-.442 1.805-.442 1.852 0 .18.16.442.316.524.247.122 8.453.122 8.7 0 .156-.082.317-.344.317-.524 0-.047-.2-.88-.443-1.851C18 .28 18.005.29 17.87.14L17.742 0h-6.484l-.127.14zM5.269 7.784c-.127.145-.214.43-.705 2.416C4.253 11.44 4 12.558 4 12.674c0 .233.102.425.277.536.073.046 1.332.064 4.39.064h4.287l.165-.198c.117-.14.166-.25.166-.385 0-.15-.39-1.758-1.026-4.267-.224-.879.146-.797-3.65-.797h-3.2l-.14.157zM17.042 7.743c-.175.122-.107-.105-.884 3.01-.243.966-.443 1.84-.443 1.939 0 .134.049.244.166.384l.165.198h4.287c3.058 0 4.317-.017 4.39-.064a.612.612 0 00.277-.536c0-.192-.88-3.854-1.099-4.564a1.01 1.01 0 00-.199-.367c-.121-.116-.194-.116-3.315-.116-3.072 0-3.194.006-3.345.116z" />
      </g>
      <defs>
        <filter
          id="treasury-bills-sm_svg__filter0_d_2298_57593"
          x={0}
          y={0}
          width={29}
          height={21.274}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2298_57593" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_2298_57593" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgTreasuryBillsSm;
