
import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-400 mb-1">{label}</label>
      <div className="relative w-full h-10">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="w-full h-full rounded-md border-2 border-slate-600 flex items-center justify-end px-2"
          style={{ backgroundColor: color }}
        >
          <span className="text-sm font-mono mix-blend-difference text-white">{color}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
