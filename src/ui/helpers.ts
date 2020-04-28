import { ThemeProps, DefaultTheme } from "styled-components";

export type DefaultThemeProps = ThemeProps<DefaultTheme>;

export type ThemedProps<P = {}> = DefaultThemeProps & P;

export const getThemeProp = <P extends keyof DefaultTheme>(key: P) => <
  TProps extends DefaultThemeProps = DefaultThemeProps
>(
  lens: ((props: TProps) => keyof DefaultTheme[P]) | keyof DefaultTheme[P]
) => (props: TProps) => {
  const $value = typeof lens === "function" ? lens(props) : lens;

  return props.theme[key][$value];
};

export const getColor = getThemeProp("colors");
export const getRadius = getThemeProp("radii");
export const getFontSize = getThemeProp("fontSizes");
export const getShadow = getThemeProp("shadows");
export const getFontFamily = getThemeProp("fontFamilies");
export const getAnimation = getThemeProp("animations");
