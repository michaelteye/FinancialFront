import * as React from 'react';

function SvgTickSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={10} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.167 0C8.861 0 10 1.189 10 2.958v4.084C10 8.811 8.861 10 7.167 10H2.833C1.138 10 0 8.811 0 7.042V2.958C0 1.189 1.138 0 2.833 0h4.334zm0 .75H2.832C1.568.75.75 1.617.75 2.958v4.084c0 1.341.817 2.208 2.083 2.208h4.333c1.266 0 2.084-.867 2.084-2.208V2.958C9.25 1.616 8.432.75 7.167.75zm-.122 2.799a.375.375 0 010 .53L4.672 6.452a.372.372 0 01-.53 0L2.955 5.264a.375.375 0 11.53-.53l.922.921 2.108-2.107a.375.375 0 01.53 0z"
        fill="#6CC224"
      />
    </svg>
  );
}

export default SvgTickSquare;
