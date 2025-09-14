
import React from 'react';

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100"
    fill="none" 
    stroke="currentColor" 
    strokeWidth="5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
    >
        <circle cx="50" cy="50" r="30" fill="#FFD700" stroke="none" />
  </svg>
);

export default SunIcon;
