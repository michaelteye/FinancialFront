import * as React from 'react';

function SvgBezoWithdraw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={37} height={37} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity={0.5} cx={18.5} cy={18.5} r={18.5} fill="#F64" fillOpacity={0.5} />
      <path
        d="M18.507 19.713c-1.533 0-2.93-.09-3.842-.225a.422.422 0 00-.063-.015l-.261-.052c-.333-.068-.834-.178-1.058-.294a1.89 1.89 0 01-1.033-1.67v-.06c.015-.45.41-1.398.425-1.398.668-1.595 2.749-4.738 4.131-6.001l.048-.047c.104-.102.357-.344.53-.465.319-.24.713-.361 1.108-.361.44 0 .85.135 1.185.39.061.061.318.286.532.497 1.336 1.233 3.522 4.453 4.191 6.137.107.255.334.902.35 1.249 0 .33-.077.646-.228.947a1.964 1.964 0 01-.942.842c-.273.106-1.094.272-1.109.272-.896.165-2.353.255-3.964.255zm-.008 8.162a1.574 1.574 0 01-1.58-1.566l.34-3.853c0-.679.555-1.229 1.24-1.229.687 0 1.24.55 1.24 1.229l.342 3.853c0 .865-.708 1.566-1.581 1.566z"
        fill="#F64"
      />
    </svg>
  );
}

export default SvgBezoWithdraw;
