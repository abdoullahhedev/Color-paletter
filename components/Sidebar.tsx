import React, { useState } from 'react';
import type { Palette, BackgroundElements, AiSuggestion } from '../types';
import { PRESET_PALETTES } from '../constants';
import ColorPicker from './ColorPicker';
import Toggle from './Toggle';
import CloudIcon from './icons/CloudIcon';
import SunIcon from './icons/SunIcon';
import TreeIcon from './icons/TreeIcon';

interface SidebarProps {
  palette: Palette;
  backgroundElements: BackgroundElements;
  onColorChange: (part: keyof Palette, color: string) => void;
  onToggleChange: (element: keyof BackgroundElements) => void;
  onPresetSelect: (palette: Palette) => void;
  onExport: () => void;
  onAiGenerate: (baseColor: string, description: string) => void;
  aiSuggestion: AiSuggestion | null;
  isAiLoading: boolean;
  aiError: string | null;
  onToggleLightingPanel: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-bold text-cyan-300 mb-3 border-b-2 border-slate-600 pb-2">{children}</h3>
);

const BASE_COLORS = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Brown', 'Gray', 'Black', 'White'];

const Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    palette,
    backgroundElements,
    onColorChange,
    onToggleChange,
    onPresetSelect,
    onExport,
    onAiGenerate,
    aiSuggestion,
    isAiLoading,
    aiError,
    onToggleLightingPanel,
  } = props;

  const [aiBaseColor, setAiBaseColor] = useState('Blue');
  const [aiDescription, setAiDescription] = useState('A mysterious car for a detective');
  const [applyTarget, setApplyTarget] = useState<keyof Palette>('carBody');

  const handleGenerateClick = () => {
    if (aiDescription.trim()) {
      onAiGenerate(aiBaseColor, aiDescription);
    }
  };

  return (
    <aside className="w-full lg:w-96 bg-slate-800/50 backdrop-blur-sm text-slate-200 p-6 overflow-y-auto shrink-0 h-screen z-20">
      <h2 className="text-2xl font-black text-white mb-6">Palette Visualizer</h2>

      <div className="space-y-6">
        {/* AI Assistant */}
        <div>
          <SectionTitle>AI Color Assistant</SectionTitle>
          <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="base-color" className="text-sm font-medium text-slate-400 mb-1 block">Base Color</label>
                <select 
                  id="base-color" 
                  value={aiBaseColor}
                  onChange={(e) => setAiBaseColor(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                >
                  {BASE_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
               <div className="col-span-2">
                <label htmlFor="description" className="text-sm font-medium text-slate-400 mb-1 block">Describe the Element</label>
                <input 
                  type="text"
                  id="description"
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="e.g., A hero's cape"
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={handleGenerateClick}
              disabled={isAiLoading || !aiDescription.trim()}
              className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isAiLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : "Generate Color"}
            </button>
            {aiError && <p className="text-sm text-red-400 bg-red-900/50 p-2 rounded-md">{aiError}</p>}
            {aiSuggestion && !isAiLoading && (
              <div className="space-y-3 pt-3 border-t border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-600" style={{ backgroundColor: aiSuggestion.color }}></div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">Suggested Color</p>
                    <p className="font-mono text-cyan-300">{aiSuggestion.color}</p>
                  </div>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-300 mb-1">AI Reasoning:</h4>
                    <p className="text-sm text-slate-400 bg-slate-800 p-3 rounded-md border border-slate-700">{aiSuggestion.reasoning}</p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                    <select 
                        value={applyTarget}
                        onChange={(e) => setApplyTarget(e.target.value as keyof Palette)}
                        className="flex-grow bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    >
                        {Object.keys(palette).map(part => <option key={part} value={part}>{part.charAt(0).toUpperCase() + part.slice(1).replace(/([A-Z])/g, ' $1')}</option>)}
                    </select>
                    <button 
                      onClick={() => onColorChange(applyTarget, aiSuggestion.color)}
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-md font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      Apply
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Character Colors */}
        <div>
          <SectionTitle>Character</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker label="Hair" color={palette.hair} onChange={(c) => onColorChange('hair', c)} />
            <ColorPicker label="Skin" color={palette.skin} onChange={(c) => onColorChange('skin', c)} />
            <ColorPicker label="Jacket" color={palette.jacket} onChange={(c) => onColorChange('jacket', c)} />
            <ColorPicker label="Shirt" color={palette.shirt} onChange={(c) => onColorChange('shirt', c)} />
            <ColorPicker label="Pants" color={palette.pants} onChange={(c) => onColorChange('pants', c)} />
            <ColorPicker label="Shoes" color={palette.shoes} onChange={(c) => onColorChange('shoes', c)} />
          </div>
        </div>

        {/* Prop Colors */}
        <div>
          <SectionTitle>Prop</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker label="Car Body" color={palette.carBody} onChange={(c) => onColorChange('carBody', c)} />
            <ColorPicker label="Car Trim" color={palette.carTrim} onChange={(c) => onColorChange('carTrim', c)} />
          </div>
        </div>
        
        {/* Background Colors */}
        <div>
          <SectionTitle>Background</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker label="Sky" color={palette.sky} onChange={(c) => onColorChange('sky', c)} />
            <ColorPicker label="Ground" color={palette.ground} onChange={(c) => onColorChange('ground', c)} />
          </div>
        </div>

        {/* Background Elements */}
        <div>
          <SectionTitle>Elements</SectionTitle>
          <div className="space-y-3">
             <Toggle label="Sun" isChecked={backgroundElements.sun} onToggle={() => onToggleChange('sun')}>
                <SunIcon className="w-5 h-5 text-yellow-300" />
            </Toggle>
            <Toggle label="Clouds" isChecked={backgroundElements.clouds} onToggle={() => onToggleChange('clouds')}>
                <CloudIcon className="w-5 h-5 text-slate-300" />
            </Toggle>
            <Toggle label="Trees" isChecked={backgroundElements.trees} onToggle={() => onToggleChange('trees')}>
                <TreeIcon className="w-5 h-5 text-green-400" />
            </Toggle>
          </div>
        </div>

        {/* Preset Palettes */}
        <div>
          <SectionTitle>Presets</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_PALETTES.map(({ name, palette }) => (
              <button
                key={name}
                onClick={() => onPresetSelect(palette)}
                className="px-4 py-2 bg-slate-700 hover:bg-cyan-600 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="pt-4 space-y-3">
            <button
                onClick={onToggleLightingPanel}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg text-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                Lighting Variations
            </button>
            <button
                onClick={onExport}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 rounded-lg text-lg font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                Export Palette (.json)
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
