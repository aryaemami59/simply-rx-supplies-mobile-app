import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { StackNavigationOptions } from "@react-navigation/stack";
import type { IconNode, SearchBar as SearchBarType } from "@rneui/base";
import type { HeaderProps, SearchBarProps } from "@rneui/themed";
import type { PropsWithChildren, ReactElement } from "react";
import type {
  FlatListProps,
  ListRenderItem,
  TextInput,
  TouchableWithoutFeedbackProps,
  View,
} from "react-native";
import type * as Animatable from "react-native-animatable";

export type TabBarIconProps = Parameters<
  NonNullable<BottomTabNavigationOptions["tabBarIcon"]>
>[number];

export type RenderItem<T> = NonNullable<ListRenderItem<T>>;

export type SearchBarRef = PropsWithChildren<SearchBarProps> &
  TextInput &
  SearchBarType;
export type AnimatableViewRef = Animatable.View & View;
export type HeaderStyle = NonNullable<StackNavigationOptions["headerStyle"]>;
export type HeaderTitleStyle = NonNullable<
  StackNavigationOptions["headerTitleStyle"]
>;
export type TabHeader = Header<BottomTabNavigationOptions>;
export type StackHeader = Header<StackNavigationOptions>;
export type Header<
  T extends BottomTabNavigationOptions | StackNavigationOptions
> = NonNullable<T["header"]>;
export type TabBarIcon = NonNullable<BottomTabNavigationOptions["tabBarIcon"]>;
export type HeaderRight = NonNullable<StackNavigationOptions["headerRight"]>;

export type OnPress = NonNullable<TouchableWithoutFeedbackProps["onPress"]>;

export type KeyExtractor<T> = NonNullable<FlatListProps<T>["keyExtractor"]>;

export type CenterComponent = Extract<
  ReactElement,
  NonNullable<HeaderProps["centerComponent"]>
>;

export type Icon = NonNullable<IconNode>;

export type AnyObject = Record<string, unknown>;

export type AnyArray = unknown[];

export type AnyFunction = (...args: unknown[]) => unknown;

export type EmptyObject = Record<string, never>;

export type EmptyArray = never[];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type ObjectOrArray = AnyArray | AnyObject;

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
