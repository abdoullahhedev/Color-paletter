import type { Palette } from './types';

interface Preset {
  name: string;
  palette: Palette;
}

export const INITIAL_PALETTE: Palette = {
  hair: '#4a2311',
  skin: '#f2d5b1',
  jacket: '#2c3e50',
  shirt: '#ecf0f1',
  pants: '#34495e',
  shoes: '#1a1a1a',
  carBody: '#c0392b',
  carTrim: '#bdc3c7',
  sky: '#3498db',
  ground: '#27ae60',
};

export const PRESET_PALETTES: Preset[] = [
  {
    name: 'Cyberpunk Night',
    palette: {
      hair: '#ff4ff8',
      skin: '#e0cbf0',
      jacket: '#1a1a1a',
      shirt: '#0d0d0d',
      pants: '#4b4b4b',
      shoes: '#eeeeee',
      carBody: '#00ffff',
      carTrim: '#ff00ff',
      sky: '#0c002a',
      ground: '#3d1553',
    },
  },
  {
    name: 'Sunset Drive',
    palette: {
      hair: '#6b3611',
      skin: '#ffc599',
      jacket: '#8e44ad',
      shirt: '#f1c40f',
      pants: '#2c3e50',
      shoes: '#d35400',
      carBody: '#e67e22',
      carTrim: '#ecf0f1',
      sky: '#e74c3c',
      ground: '#95a5a6',
    },
  },
  {
    name: 'Forest Adventure',
    palette: {
      hair: '#e67e22',
      skin: '#f3c49a',
      jacket: '#27ae60',
      shirt: '#f0f0f0',
      pants: '#8B4513',
      shoes: '#5a3825',
      carBody: '#16a085',
      carTrim: '#1abc9c',
      sky: '#87ceeb',
      ground: '#006400',
    },
  },
    {
    name: 'Default',
    palette: INITIAL_PALETTE,
  }
];

export const LIGHTING_SCENARIOS = [
  "Neutral / Flat Light",
  "Direct Sunlight",
  "Overcast / Soft Light",
  "Golden Hour",
  "Moonlight / Night",
  "Indoor Tungsten",
  "Fluorescent Light",
  "Firelight / Torchlight",
  "Candlelight",
  "Backlight / Rim Light",
  "Spotlight / Stage Light",
  "Underwater Light",
  "Storm / Lightning",
];

export const INTENSITY_LEVELS = ["Light", "Medium", "Strong"];
