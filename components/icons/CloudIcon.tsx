
import React from 'react';

const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 120 80" 
    fill="#FFFFFF" 
    stroke="#F0F0F0" 
    strokeWidth="2"
    {...props}
    >
    <path d="M95,60 C115,60 115,40 100,40 C100,20 80,20 75,30 C70,10 50,10 45,25 C30,25 25,40 40,50 C40,50 20,60 30,65 C40,70 90,70 95,60Z" />
  </svg>
);

export default CloudIcon;
