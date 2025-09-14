import React, { useState, useCallback } from 'react';
// FIX: Correctly import GoogleGenAI and Type for creating AI clients and defining response schemas.
import { GoogleGenAI, Type } from '@google/genai';

import Sidebar from './components/Sidebar';
import Character from './components/Character';
import Background from './components/Background';
import Car from './components/Car';
import LightingSidebar from './components/LightingSidebar';

import { INITIAL_PALETTE } from './constants';
import type { Palette, BackgroundElements, AiSuggestion, LightingPaletteVariation, ColorVariationSet } from './types';

function App() {
  const [palette, setPalette] = useState<Palette>(INITIAL_PALETTE);
  const [backgroundElements, setBackgroundElements] = useState<BackgroundElements>({
    sun: true,
    clouds: true,
    trees: true,
  });

  // AI Color Assistant State
  const [aiSuggestion, setAiSuggestion] = useState<AiSuggestion | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Lighting Panel State
  const [showLightingPanel, setShowLightingPanel] = useState(false);
  const [lightingVariations, setLightingVariations] = useState<LightingPaletteVariation | null>(null);
  const [isLightingLoading, setIsLightingLoading] = useState(false);
  const [lightingError, setLightingError] = useState<string | null>(null);

  // Single Color Lighting State
  const [singleColorVariation, setSingleColorVariation] = useState<ColorVariationSet | null>(null);
  const [isSingleColorLoading, setIsSingleColorLoading] = useState(false);
  const [singleColorError, setSingleColorError] = useState<string | null>(null);


  const handleColorChange = useCallback((part: keyof Palette, color: string) => {
    setPalette(p => ({ ...p, [part]: color }));
  }, []);

  const handleToggleChange = useCallback((element: keyof BackgroundElements) => {
    setBackgroundElements(e => ({ ...e, [element]: !e[element] }));
  }, []);
  
  const handlePresetSelect = useCallback((newPalette: Palette) => {
    setPalette(newPalette);
  }, []);

  const handleExport = useCallback(() => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ palette, backgroundElements }, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "palette-visualizer-export.json";
    link.click();
  }, [palette, backgroundElements]);

  const handleAiGenerate = async (baseColor: string, description: string) => {
    setIsAiLoading(true);
    setAiError(null);
    setAiSuggestion(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const prompt = `Based on the color family of "${baseColor}" and the description "${description}", suggest a single hex color code. Also provide a brief, one-sentence reasoning for your choice. The output must be a JSON object with two keys: "color" (a string with the hex code, e.g., "#RRGGBB") and "reasoning" (a string).`;
      
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        color: { 
                            type: Type.STRING,
                            description: "The suggested hex color code."
                        },
                        reasoning: { 
                            type: Type.STRING,
                            description: "A brief explanation for the color choice."
                        }
                    },
                    required: ["color", "reasoning"]
                }
            }
        });
        
        const resultText = response.text.replace(/```json\n?|\n?```/g, '');
        const resultJson = JSON.parse(resultText);
        
        if (resultJson.color && resultJson.reasoning) {
            setAiSuggestion(resultJson);
        } else {
            throw new Error("Invalid response format from AI.");
        }
    } catch (error) {
      console.error("AI generation failed:", error);
      setAiError("Failed to get suggestion. The model may have returned an unexpected response. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateLighting = async (scenario: string, intensity: string, basePalette: Palette) => {
    setIsLightingLoading(true);
    setLightingError(null);
    setLightingVariations(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        const prompt = `
            Given this base color palette in JSON format:
            ${JSON.stringify(basePalette, null, 2)}

            Generate a new palette that simulates a "${scenario}" lighting condition with "${intensity}" intensity.

            For each color key in the original palette, create an object containing five variations:
            - "base": The original color.
            - "highlight": A lighter version for direct light.
            - "shadow": A darker, desaturated version for shadowed areas.
            - "ambient": A color influenced by the ambient light (e.g., blue for moonlight, orange for golden hour).
            - "rim": A bright color for edge lighting or specular highlights.

            The output MUST be a single, valid JSON object. The top-level keys should be the same as the input palette (e.g., "hair", "skin", "carBody"). Each key's value should be an object with the five color variations ("base", "highlight", "shadow", "ambient", "rim") as hex color strings. Do not include any other text or explanations outside of the JSON object.
        `;

        const colorVariationSetSchema = {
            type: Type.OBJECT,
            properties: {
                base: { type: Type.STRING, description: "The original base color." },
                highlight: { type: Type.STRING, description: "The color in direct light." },
                shadow: { type: Type.STRING, description: "The color in shadow." },
                ambient: { type: Type.STRING, description: "The color affected by ambient light." },
                rim: { type: Type.STRING, description: "The color for rim lighting." },
            },
            required: ["base", "highlight", "shadow", "ambient", "rim"],
        };

        const paletteKeys = Object.keys(basePalette);
        const schemaProperties = paletteKeys.reduce((acc, key) => {
            acc[key] = colorVariationSetSchema;
            return acc;
        }, {} as Record<string, unknown>);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: schemaProperties,
                }
            },
        });

        const resultText = response.text.replace(/```json\n?|\n?```/g, '');
        const resultJson = JSON.parse(resultText);
        setLightingVariations(resultJson);

    } catch (error) {
        console.error("AI lighting generation failed:", error);
        setLightingError("Failed to generate lighting variations. The model might have returned an unexpected format. Please try again.");
    } finally {
        setIsLightingLoading(false);
    }
  };
  
  const handleSingleColorLightingGenerate = async (color: string, scenario: string, intensity: string) => {
    setIsSingleColorLoading(true);
    setSingleColorError(null);
    setSingleColorVariation(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const prompt = `
            Given the base color "${color}", generate a set of five color variations that simulate a "${scenario}" lighting condition with "${intensity}" intensity.

            The output must be a single, valid JSON object with the following five keys, each with a hex color string value:
            - "base": The original color.
            - "highlight": A lighter version for direct light.
            - "shadow": A darker, desaturated version for shadowed areas.
            - "ambient": A color influenced by the ambient light of the scene.
            - "rim": A bright color for edge lighting.

            Do not include any other text or explanations outside of the JSON object.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        base: { type: Type.STRING },
                        highlight: { type: Type.STRING },
                        shadow: { type: Type.STRING },
                        ambient: { type: Type.STRING },
                        rim: { type: Type.STRING },
                    },
                    required: ["base", "highlight", "shadow", "ambient", "rim"],
                }
            },
        });

        const resultText = response.text.replace(/```json\n?|\n?```/g, '');
        const resultJson = JSON.parse(resultText);
        setSingleColorVariation(resultJson);

    } catch (error) {
        console.error("AI single color lighting generation failed:", error);
        setSingleColorError("Failed to generate variations for the single color.");
    } finally {
        setIsSingleColorLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-900 font-sans">
      <Sidebar
        palette={palette}
        backgroundElements={backgroundElements}
        onColorChange={handleColorChange}
        onToggleChange={handleToggleChange}
        onPresetSelect={handlePresetSelect}
        onExport={handleExport}
        onAiGenerate={handleAiGenerate}
        aiSuggestion={aiSuggestion}
        isAiLoading={isAiLoading}
        aiError={aiError}
        onToggleLightingPanel={() => setShowLightingPanel(p => !p)}
      />

      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        <Background
          skyColor={palette.sky}
          groundColor={palette.ground}
          showSun={backgroundElements.sun}
          showClouds={backgroundElements.clouds}
          showTrees={backgroundElements.trees}
        />
        <div className="relative z-10 flex flex-col items-center justify-end h-full w-full max-w-4xl">
           <div className="absolute top-1/2 -translate-y-[calc(50%+100px)]">
             <Character
                hairColor={palette.hair}
                skinColor={palette.skin}
                jacketColor={palette.jacket}
                shirtColor={palette.shirt}
                pantsColor={palette.pants}
                shoesColor={palette.shoes}
              />
           </div>
           <div className="absolute bottom-10">
            <Car bodyColor={palette.carBody} trimColor={palette.carTrim} />
           </div>
        </div>
      </main>

      {showLightingPanel && (
        <LightingSidebar
            onClose={() => setShowLightingPanel(false)}
            onGenerate={handleGenerateLighting}
            isGenerating={isLightingLoading}
            error={lightingError}
            lightingVariations={lightingVariations}
            basePalette={palette}
            onGenerateSingleColor={handleSingleColorLightingGenerate}
            isGeneratingSingle={isSingleColorLoading}
            errorSingle={singleColorError}
            singleColorVariation={singleColorVariation}
        />
      )}
    </div>
  );
}

export default App;