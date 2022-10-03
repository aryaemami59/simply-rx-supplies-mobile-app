import { FlexStyle, ImageStyle, TextStyle, ViewStyle } from "react-native";

export const MAIN_COLOR = "#0071dc" as const;

export const BACKGROUND_MAIN_COLOR: ViewStyle = {
  backgroundColor: MAIN_COLOR,
} as const;

export const BACKGROUND_TRANSPARENT: ViewStyle = {
  backgroundColor: "transparent",
} as const;

export const DISPLAY_NONE: ViewStyle = {
  display: "none",
} as const;

export const WIDTH_100: FlexStyle = {
  width: "100%",
} as const;

export const WIDTH_90: ImageStyle = {
  width: "90%",
} as const;

export const WIDTH_80: FlexStyle | ImageStyle = {
  width: "80%",
} as const;

export const WIDTH_70: FlexStyle | ImageStyle = {
  width: "70%",
} as const;

export const WIDTH_60: FlexStyle | ImageStyle = {
  width: "60%",
} as const;

export const HEIGHT_100: FlexStyle = {
  height: "100%",
} as const;

export const PADDING_VERTICAL_0: FlexStyle = {
  paddingVertical: 0,
} as const;

export const BARCODE_ASPECT_RATIO: ImageStyle = {
  aspectRatio: 33 / 28,
} as const;

export const JC_CENTER: FlexStyle = {
  justifyContent: "center",
} as const;

export const AI_CENTER: FlexStyle = {
  alignItems: "center",
} as const;

export const JC_SPACE_BETWEEN: FlexStyle = {
  justifyContent: "space-between",
} as const;

export const JC_SPACE_EVENLY: FlexStyle = {
  justifyContent: "space-evenly",
} as const;

export const JC_SPACE_AROUND: FlexStyle = {
  justifyContent: "space-around",
} as const;

export const JC_AI_CENTER: FlexStyle = {
  justifyContent: "center",
  alignItems: "center",
} as const;

export const AI_FLEX_START: FlexStyle = {
  alignItems: "flex-start",
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

export const PADDING_TOP_20: TextStyle = {
  paddingTop: 20,
} as const;

export const ICON_GRAY_COLOR = "rgba(255,255,255,.5)" as const;

export const SEARCH_BAR_COLOR = "rgba(0, 0, 0, 0.3)" as const;
