
import React from 'react';
import CloudIcon from './icons/CloudIcon';
import SunIcon from './icons/SunIcon';
import TreeIcon from './icons/TreeIcon';

interface BackgroundProps {
  skyColor: string;
  groundColor: string;
  showSun: boolean;
  showClouds: boolean;
  showTrees: boolean;
}

const Background: React.FC<BackgroundProps> = ({
  skyColor,
  groundColor,
  showSun,
  showClouds,
  showTrees,
}) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full rounded-lg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
    >
      <rect x="0" y="0" width="800" height="450" fill={skyColor} />
      <path d="M 0 450 C 200 420, 600 480, 800 450 L 800 600 L 0 600 Z" fill={groundColor} />

      {showSun && (
        <g transform="translate(100, 100)">
          <SunIcon />
        </g>
      )}

      {showClouds && (
        <>
          <g transform="translate(250, 120) scale(1.2)">
            <CloudIcon />
          </g>
          <g transform="translate(500, 80) scale(0.9)">
            <CloudIcon />
          </g>
          <g transform="translate(650, 150) scale(1.1)">
            <CloudIcon />
          </g>
        </>
      )}
      
      {showTrees && (
        <>
          <g transform="translate(600, 320) scale(1.5)">
            <TreeIcon />
          </g>
          <g transform="translate(150, 350) scale(1.2)">
            <TreeIcon />
          </g>
           <g transform="translate(50, 380) scale(1)">
            <TreeIcon />
          </g>
        </>
      )}
    </svg>
  );
};

export default Background;
