import * as React from 'react';

function SvgDislike(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.583 2.708a2.708 2.708 0 00-2.708 2.709v6.666a2.708 2.708 0 005.099 1.274c.074.123.155.253.241.394l1.899 3.085a1.833 1.833 0 003.373-1.24l-.203-1.316a1.726 1.726 0 011.706-1.988h.575c2.579 0 4.256-2.714 3.103-5.02l-.957-1.915a4.792 4.792 0 00-4.286-2.649H10a3.95 3.95 0 00-3.035 1.418 2.708 2.708 0 00-2.382-1.418zm1.459 2.709a1.458 1.458 0 10-2.917 0v6.666a1.458 1.458 0 002.917 0V5.417zm1.338 5.858c-.085-.373-.088-.767-.088-1.747V6.667A2.708 2.708 0 0110 3.958h2.425c1.341 0 2.568.758 3.168 1.958l.957 1.914c.737 1.476-.335 3.212-1.985 3.212h-.575a2.976 2.976 0 00-2.941 3.428l.203 1.317a.583.583 0 01-1.074.394L8.32 13.16c-.514-.835-.717-1.172-.84-1.535a3.537 3.537 0 01-.1-.35z"
        fill="#2D264B"
      />
    </svg>
  );
}

export default SvgDislike;


  {/* <button
                  className="w-full py-3 rounded-lg text-[#2138A8] font-semibold underline"
                  onClick={closeModal}
                >
                  Close
                </button> */}
