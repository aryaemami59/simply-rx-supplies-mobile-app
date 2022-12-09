import type { SearchBar as SearchBarType } from "@rneui/base";
import type { SearchBarProps } from "@rneui/themed";
import type { PropsWithChildren } from "react";
import type { TextInput, View } from "react-native";
import type * as Animatable from "react-native-animatable";

export type tabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export type OnChangeText = (text: string) => void;

export type SearchBarRef = PropsWithChildren<SearchBarProps> &
  TextInput &
  SearchBarType;

export type AnimatableViewRef = Animatable.View & View;
