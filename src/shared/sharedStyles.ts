import { FlexStyle, TextStyle, ViewStyle } from "react-native";

export const MAIN_COLOR = "#0071dc" as const;

export const BACKGROUND_MAIN_COLOR: ViewStyle = {
  backgroundColor: MAIN_COLOR,
} as const;

export const DISPLAY_NONE: ViewStyle = {
  display: "none",
} as const;

export const WIDTH_100: FlexStyle = {
  width: "100%",
} as const;

export const WIDTH_80: FlexStyle = {
  width: "80%",
} as const;

export const HEIGHT_100: FlexStyle = {
  height: "100%",
} as const;

export const JC_CENTER: FlexStyle = {
  justifyContent: "center",
} as const;

export const AI_CENTER: FlexStyle = {
  alignItems: "center",
} as const;

export const JC_AI_CENTER: FlexStyle = {
  justifyContent: "center",
  alignItems: "center",
} as const;

export const JC_AI_CENTER_HEIGHT100: FlexStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
} as const;

export const COLOR_WHITE: TextStyle = {
  color: "white",
} as const;

export const TEXT_CENTER: TextStyle = {
  textAlign: "center",
} as const;

export const TEXT_UNDERLINE: TextStyle = {
  textDecorationLine: "underline",
} as const;

export const FONT_WEIGHT_600: TextStyle = {
  fontWeight: "600",
} as const;

export const FONT_WEIGHT_700: TextStyle = {
  fontWeight: "700",
} as const;

export const FONT_WEIGHT_BOLD: TextStyle = {
  fontWeight: "bold",
} as const;
