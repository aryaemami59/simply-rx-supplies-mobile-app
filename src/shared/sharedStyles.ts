import {
  FlexAlignType,
  FlexStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

// export const mainColor = "rgb(0, 113, 220)" as const;
export const mainColor = "#0071dc" as const;

export const fontWeightBold = "700" as const;

export const displayNone: StyleProp<ViewStyle> = {
  display: "none",
} as const;

export const width100: FlexStyle = {
  width: "100%",
} as const;

export const height100: FlexStyle = {
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

export const width80: FlexStyle = {
  width: "80%",
} as const;

export const colorWhite: TextStyle = {
  color: "white",
} as const;
