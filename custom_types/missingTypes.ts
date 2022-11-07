import { SearchBar as SearchBarType } from "@rneui/base";
import { SearchBarProps } from "@rneui/themed";
import { PropsWithChildren } from "react";
import { TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";

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
