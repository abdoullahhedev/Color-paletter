
import React from 'react';

const TreeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 150" 
    {...props}
    >
    <rect x="40" y="100" width="20" height="50" fill="#8B4513" />
    <polygon points="50,0 100,70 0,70" fill="#228B22" />
    <polygon points="50,30 90,90 10,90" fill="#32CD32" />
  </svg>
);

export default TreeIcon;
