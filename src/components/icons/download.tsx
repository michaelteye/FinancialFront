import * as React from 'react';

function SvgDownload(props: React.SVGProps<SVGSVGElement>) {
  const iconSize = 448;
  const circleRadius = iconSize * 0.50; // Adjust this value to make the circular background larger

  return (
   <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF" // White color for the bell icon
    width={120} // Adjust the size of the SVG as needed
    height={68} // Adjust the size of the SVG as needed
    style={{ backgroundColor: '#ff86cc', borderRadius: '100%' }} // Red background with border-radius to make it circular
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm7-15c0-3.07-1.64-5.64-4.5-6.32V4c0 .55-.45 1-1 1s-1-.45-1-1v-.32C6.64 1.36 5 3.93 5 7v5H3c-.55 0-1 .45-1 1v3h18v-3c0-.55-.45-1-1-1h-2v-5zM12 2c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zM9.99 20c1.11 0 2.01-.89 2.01-2H7.98c0 1.11.9 2 2.01 2z" />
  </svg>
  );
}

export default SvgDownload;











// <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />


// ff86cc
// <circle cx="50" cy="50" r="50" fill="#FF86CC" />
//  <g fill="#FFFFFF">
//<path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
//</g>




// import React from 'react';

// const BellSVG = () => (
//   <svg
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="#FFFFFF" // White color for the bell icon
//     width="64" // Adjust the size of the SVG as needed
//     height="64" // Adjust the size of the SVG as needed
//     style={{ backgroundColor: '#FF0000', borderRadius: '50%' }} // Red background with border-radius to make it circular
//   >
//     <path d="M0 0h24v24H0z" fill="none" />
//     <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm7-15c0-3.07-1.64-5.64-4.5-6.32V4c0 .55-.45 1-1 1s-1-.45-1-1v-.32C6.64 1.36 5 3.93 5 7v5H3c-.55 0-1 .45-1 1v3h18v-3c0-.55-.45-1-1-1h-2v-5zM12 2c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zM9.99 20c1.11 0 2.01-.89 2.01-2H7.98c0 1.11.9 2 2.01 2z" />
//   </svg>
// );

// export default BellSVG;