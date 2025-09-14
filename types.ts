export interface Palette {
  hair: string;
  skin: string;
  jacket: string;
  shirt: string;
  pants: string;
  shoes: string;
  carBody: string;
  carTrim: string;
  sky: string;
  ground: string;
}

export interface BackgroundElements {
  sun: boolean;
  clouds: boolean;
  trees: boolean;
}

export interface AiSuggestion {
  color: string;
  reasoning: string;
}

// New Types for Lighting Variations
export interface ColorVariationSet {
  base: string;
  highlight: string;
  shadow: string;
  ambient: string;
  rim: string;
}

export interface LightingPaletteVariation {
  [key: string]: ColorVariationSet;
}