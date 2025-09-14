import React from 'react';

interface CharacterProps {
  hairColor: string;
  skinColor: string;
  jacketColor: string;
  shirtColor: string;
  pantsColor: string;
  shoesColor: string;
}

const Character: React.FC<CharacterProps> = ({
  hairColor,
  skinColor,
  jacketColor,
  shirtColor,
  pantsColor,
  shoesColor,
}) => {
  return (
    <svg 
        width="200" 
        height="500" 
        viewBox="0 0 200 500" 
        xmlns="http://www.w3.org/2000/svg" 
        className="overflow-visible"
    >
      {/* Shoes */}
      <path d="M 50 480 L 55 495 L 95 495 L 100 480 Z" fill={shoesColor} />
      <path d="M 105 480 L 110 495 L 150 495 L 155 480 Z" fill={shoesColor} />

      {/* Pants */}
      <path d="M 60 320 L 60 480 L 95 480 L 95 320 Z" fill={pantsColor} />
      <path d="M 105 320 L 105 480 L 140 480 L 140 320 Z" fill={pantsColor} />
      <path d="M 60 310 L 140 310 L 140 325 L 60 325 Z" fill={pantsColor} />
      
      {/* Hands */}
      <circle cx="45" cy="330" r="12" fill={skinColor} />
      <circle cx="155" cy="330" r="12" fill={skinColor} />

      {/* Jacket */}
      <path d="M 55 160 L 145 160 L 150 320 L 50 320 Z" fill={jacketColor} />
      {/* Sleeves */}
      <path d="M 40 165 L 55 160 L 50 320 L 35 315 Z" fill={jacketColor} />
      <path d="M 160 165 L 145 160 L 150 320 L 165 315 Z" fill={jacketColor} />
      {/* Lapels */}
      <path d="M 100 160 L 115 160 L 100 210 Z" fill={shirtColor} />
      <path d="M 100 160 L 85 160 L 100 210 Z" fill={shirtColor} />
      <path d="M 85 160 L 65 160 L 90 220 L 100 210 Z" fill={jacketColor} stroke={jacketColor} strokeWidth="2" />
      <path d="M 115 160 L 135 160 L 110 220 L 100 210 Z" fill={jacketColor} stroke={jacketColor} strokeWidth="2" />

      {/* Shirt Collar */}
      <path d="M 90 155 L 100 165 L 110 155 Z" fill={shirtColor} />
      
      {/* Neck */}
      <rect x="90" y="140" width="20" height="20" fill={skinColor} />

      {/* Head */}
      <path d="M 70 145 C 70 145, 60 90, 100 70 C 140 90, 130 145, 130 145 Z" fill={skinColor} />

      {/* Hair */}
      <path 
        d="M 100 75 C 60 75, 65 110, 65 110 C 65 110, 60 40, 100 40 C 140 40, 135 110, 135 110 C 135 110, 140 75, 100 75 Z"
        fill={hairColor}
      />
      
      {/* Face Features (subtle) */}
      <line x1="85" y1="100" x2="95" y2="100" stroke="#000" strokeWidth="2" />
      <line x1="105" y1="100" x2="115" y2="100" stroke="#000" strokeWidth="2" />
    </svg>
  );
};

export default Character;
