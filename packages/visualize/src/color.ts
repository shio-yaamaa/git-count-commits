import chroma from "chroma-js";

const colorScale = chroma.scale([
  '#FFF3E0', // Orange 50
  '#FB8C00', // Orange 600
]);

export const generateHeatmapColor = (value: number, max: number): string => {
  if (value === 0) {
    return '#FFFFFF';
  }
  return colorScale(value / max).hex();
};
