import { keyframes } from "styled-components";

export const colors = {
  brand: "#786dff",
  black: "#333",
  white: "#FFF",
  gray: "#CCC",
  darkGray: "#666",
  shadow: "rgba(0, 0, 0, 0.4)"
} as const;

export const radii = {
  default: "0.2rem",
  sm: "0.1rem",
  md: "0.2rem",
  lg: "0.3rem",
  xl: "0.4rem",
  xxl: "0.6rem",
  xxxl: "1rem",
  round: "50%"
} as const;

export const shadows = {
  default: `0 1px 2px ${colors.shadow}`,
  inset: `inset 1px 0 2px`,
  top: `0 -2px 6px ${colors.shadow}`,
  none: "none"
} as const;

export const fontFamilies = {
  display: "'Black Ops One', monospace",
  default: "'Lato', sans-serif",
  voice: "'Vollkorn', serif"
};

const baseFontSize = 18;

export const fontSizes = {
  default: baseFontSize,
  xs: baseFontSize * 0.6,
  sm: baseFontSize * 0.8,
  md: baseFontSize,
  lg: baseFontSize * 1.2
} as const;

const animations = {
  appear: keyframes`
    from {
      transform: scale(0.1);
      opacity: 0.1;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  `,
  shimmer: keyframes`
    0% {
      background-position: top left;
    }
    100% {
      background-position: top right;
    }
  `
} as const;

const theme = {
  colors,
  radii,
  fontSizes,
  fontFamilies,
  shadows,
  animations
} as const;

export type Color = keyof typeof colors;

export type Radius = keyof typeof radii;

export type FontSize = keyof typeof fontSizes;

export type FontFamily = keyof typeof fontFamilies;

export type Theme = typeof theme;

export default theme;
