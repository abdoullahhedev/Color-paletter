import React from 'react';

interface CarProps {
  bodyColor: string;
  trimColor: string;
}

const Car: React.FC<CarProps> = ({ bodyColor, trimColor }) => {
  return (
    <svg 
        width="500" 
        height="250" 
        viewBox="0 0 500 250" 
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
    >
      <g transform="translate(0, 20)">
        {/* Wheels */}
        <circle cx="100" cy="180" r="40" fill="#222" />
        <circle cx="100" cy="180" r="20" fill="#ddd" stroke={trimColor} strokeWidth="5" />
        <circle cx="400" cy="180" r="40" fill="#222" />
        <circle cx="400" cy="180" r="20" fill="#ddd" stroke={trimColor} strokeWidth="5" />

        {/* Car Body */}
        <path 
          d="M 20 180 
             C 20 120, 80 120, 100 120 
             L 150 120 
             C 180 80, 250 70, 300 80 
             L 420 110 
             C 450 110, 480 140, 480 180 
             Z"
          fill={bodyColor}
        />
        <rect x="20" y="175" width="460" height="20" fill={bodyColor} />

        {/* Trim */}
        <rect x="20" y="170" width="460" height="8" fill={trimColor} />
        <path d="M 10 180 C 20 170, 30 170, 40 180" fill="none" stroke={trimColor} strokeWidth="6" />
        <path d="M 460 180 C 470 170, 480 170, 490 180" fill="none" stroke={trimColor} strokeWidth="6" />

        {/* Windows */}
        <path 
          d="M 160 122 
             C 180 90, 250 80, 290 90 
             L 360 105 
             L 350 122 
             L 160 122 Z"
          fill="#aaddff"
          stroke={trimColor}
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};

export default Car;
