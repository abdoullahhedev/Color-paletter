
import React from 'react';

interface ToggleProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ label, isChecked, onToggle, children }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-slate-700 transition-colors">
      <div className="flex items-center gap-3">
        {children}
        <span className="font-semibold text-slate-300">{label}</span>
      </div>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isChecked} onChange={onToggle} />
        <div className={`block w-12 h-6 rounded-full transition-colors ${isChecked ? 'bg-cyan-500' : 'bg-slate-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isChecked ? 'translate-x-6' : ''}`}></div>
      </div>
    </label>
  );
};

export default Toggle;
