import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { StackNavigationOptions } from "@react-navigation/stack";
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
export type HeaderStyle = StackNavigationOptions["headerStyle"];
export type HeaderTitleStyle = StackNavigationOptions["headerTitleStyle"];
export type TabHeader = BottomTabNavigationOptions["header"];
export type StackHeader = StackNavigationOptions["header"];
export type HeaderRight = StackNavigationOptions["headerRight"];
export type TabBarIcon = BottomTabNavigationOptions["tabBarIcon"];

export type AnyObject = Record<string, unknown>;

export type AnyArray = unknown[];

export type AnyFunction = () => unknown;

export type EmptyObject = Record<string, never>;

export type EmptyArray = [];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type AnyNonNullishValue = string | number | boolean | object | Composite;
