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
// export type TabHeader = NonNullable<BottomTabNavigationOptions["header"]>;
// export type StackHeader = NonNullable<StackNavigationOptions["header"]>;
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

export type AnyFunction = () => unknown;

export type EmptyObject = Readonly<Record<string, never>>;

export type EmptyArray = never[];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type AnyNonNullishValue = string | number | boolean | object | Composite;
