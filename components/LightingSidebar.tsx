import React, { useState } from 'react';
import type { Palette, LightingPaletteVariation, ColorVariationSet } from '../types';
import { LIGHTING_SCENARIOS, INTENSITY_LEVELS } from '../constants';
import ColorPicker from './ColorPicker';

interface LightingSidebarProps {
  onClose: () => void;
  onGenerate: (scenario: string, intensity: string, basePalette: Palette) => void;
  isGenerating: boolean;
  error: string | null;
  lightingVariations: LightingPaletteVariation | null;
  basePalette: Palette;
  onGenerateSingleColor: (color: string, scenario: string, intensity: string) => void;
  isGeneratingSingle: boolean;
  errorSingle: string | null;
  singleColorVariation: ColorVariationSet | null;
}

const LightingSidebar: React.FC<LightingSidebarProps> = ({
  onClose,
  onGenerate,
  isGenerating,
  error,
  lightingVariations,
  basePalette,
  onGenerateSingleColor,
  isGeneratingSingle,
  errorSingle,
  singleColorVariation,
}) => {
  const [scenario, setScenario] = useState(LIGHTING_SCENARIOS[0]);
  const [intensity, setIntensity] = useState(INTENSITY_LEVELS[1]);
  const [singleColor, setSingleColor] = useState('#8e44ad');
  const [inputMode, setInputMode] = useState<'picker' | 'text'>('picker');

  const handleGenerateClick = () => {
    onGenerate(scenario, intensity, basePalette);
  };

  const handleSingleGenerateClick = () => {
    onGenerateSingleColor(singleColor, scenario, intensity);
  };

  return (
    <aside className="absolute top-0 right-0 h-screen w-full lg:w-[450px] bg-slate-900/80 backdrop-blur-sm text-slate-200 p-6 overflow-y-auto z-30 shadow-2xl transform transition-transform translate-x-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-white">Lighting Variations</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {/* Full Palette Controls */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-3 border-b-2 border-slate-600 pb-2">Lighting Controls</h3>
          <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
            <div>
              <label htmlFor="lighting-scenario" className="text-sm font-medium text-slate-400 mb-1 block">Lighting Scenario</label>
              <select
                id="lighting-scenario"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                {LIGHTING_SCENARIOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="intensity-level" className="text-sm font-medium text-slate-400 mb-1 block">Intensity</label>
              <select
                id="intensity-level"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              >
                {INTENSITY_LEVELS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
        </div>
        
        {/* Full Palette Generation */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-3 border-b-2 border-slate-600 pb-2">Full Palette Generation</h3>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <button
              onClick={handleGenerateClick}
              disabled={isGenerating}
              className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : 'Generate For Full Palette'}
            </button>
          </div>
        </div>


        {/* Single Color Controls */}
        <div>
            <h3 className="text-lg font-bold text-teal-300 mb-3 border-b-2 border-slate-600 pb-2">Single Color Variation</h3>
            <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-500 -mt-2 mb-2">Uses the Scenario and Intensity selected in Lighting Controls above.</p>
                
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-400">Input Method:</label>
                    <div className="flex items-center gap-1 rounded-md bg-slate-700 p-1">
                        <button onClick={() => setInputMode('picker')} className={`px-3 py-1 text-xs rounded-md transition-colors ${inputMode === 'picker' ? 'bg-teal-600 text-white shadow' : 'bg-transparent text-slate-300 hover:bg-slate-600'}`}>Picker</button>
                        <button onClick={() => setInputMode('text')} className={`px-3 py-1 text-xs rounded-md transition-colors ${inputMode === 'text' ? 'bg-teal-600 text-white shadow' : 'bg-transparent text-slate-300 hover:bg-slate-600'}`}>Text</button>
                    </div>
                </div>

                {inputMode === 'picker' ? (
                  <ColorPicker label="Pick a Color" color={singleColor} onChange={setSingleColor} />
                ) : (
                  <div>
                    <label htmlFor="hex-input" className="text-sm font-medium text-slate-400 mb-1 block">Paste Hex Code</label>
                    <input
                      id="hex-input"
                      type="text"
                      value={singleColor}
                      onChange={(e) => setSingleColor(e.target.value)}
                      className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-sm font-mono focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      placeholder="#8e44ad"
                    />
                  </div>
                )}

                <button
                    onClick={handleSingleGenerateClick}
                    disabled={isGeneratingSingle}
                    className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                {isGeneratingSingle ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : 'Generate for this Color'}
                </button>
                {errorSingle && <p className="text-sm text-red-400 bg-red-900/50 p-3 rounded-md">{errorSingle}</p>}
                {singleColorVariation && !isGeneratingSingle && (
                <div className="pt-3 border-t border-slate-700">
                    <h4 className="font-bold text-slate-300 mb-2">Result:</h4>
                    <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {(Object.keys(singleColorVariation) as Array<keyof typeof singleColorVariation>).map(type => (
                        <div key={type}>
                        <div className="w-full h-8 rounded" style={{ backgroundColor: singleColorVariation[type] }}></div>
                        <p className="mt-1 text-slate-400 capitalize">{type}</p>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
        </div>

        {error && <p className="text-sm text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
        
        {lightingVariations && !isGenerating && (
          <div>
            <h3 className="text-lg font-bold text-purple-300 mb-3 border-b-2 border-slate-600 pb-2">Generated Full Palette</h3>
            <div className="space-y-4">
              {Object.entries(lightingVariations).map(([part, variations]) => (
                <div key={part} className="p-3 bg-slate-800/50 rounded-lg">
                  <h4 className="font-bold text-slate-300 capitalize mb-2">{part.replace(/([A-Z])/g, ' $1')}</h4>
                  <div className="grid grid-cols-5 gap-2 text-center text-xs">
                    {(Object.keys(variations) as Array<keyof typeof variations>).map(type => (
                      <div key={type}>
                        <div className="w-full h-8 rounded" style={{ backgroundColor: variations[type] }}></div>
                        <p className="mt-1 text-slate-400 capitalize">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LightingSidebar;