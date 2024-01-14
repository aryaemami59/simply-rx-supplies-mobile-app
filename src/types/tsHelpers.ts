import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import type { StackNavigationOptions } from "@react-navigation/stack";
import type { IconNode, SearchBar as SearchBarType } from "@rneui/base";
import type { HeaderProps, SearchBarProps } from "@rneui/themed";
import type { PropsWithChildren, ReactNode } from "react";
import type {
  FlatListProps,
  TextInput,
  TouchableWithoutFeedbackProps,
  View,
} from "react-native";
import type * as Animatable from "react-native-animatable";

export type TabBarIconProps = Parameters<
  NonNullable<BottomTabNavigationOptions["tabBarIcon"]>
>[number];

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
  T extends BottomTabNavigationOptions | StackNavigationOptions,
> = NonNullable<T["header"]>;

export type TabBarIcon = NonNullable<BottomTabNavigationOptions["tabBarIcon"]>;

export type HeaderRight = NonNullable<StackNavigationOptions["headerRight"]>;

export type OnPress = NonNullable<TouchableWithoutFeedbackProps["onPress"]>;

export type KeyExtractor<T> = NonNullable<FlatListProps<T>["keyExtractor"]>;

export type CenterComponent = NonNullable<HeaderProps["centerComponent"]>;

export type Icon = NonNullable<IconNode>;

export type AnyObject = Record<string, unknown>;

export type AnyArray = unknown[];

export type EmptyObject = Record<string, never>;

export type EmptyArray = never[];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type ObjectOrArray = AnyArray | AnyObject;

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type UnknownObject = Record<string, unknown>;

export type EmptyTuple = [];

export type Primitive =
  | bigint
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

export type PropsWithRequiredChildren<P = unknown> = P & {
  readonly children: ReactNode;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type WritableDeep<T> = {
  -readonly [K in keyof T]: T[K] extends object ? WritableDeep<T[K]> : T[K];
};

export type PartialObjectProperties<T extends UnknownObject> = {
  [K in keyof T]: T[K] extends UnknownObject ? Partial<T[K]> : T[K];
};

export type ValuesOf<
  TObj extends UnknownObject,
  K extends keyof TObj = keyof TObj,
> = TObj[K];

export type ObjectEntries<
  TObj extends UnknownObject,
  K extends keyof TObj = keyof TObj,
> = TObj extends { readonly [X in K]: TObj[X] }
  ? ValuesOf<{
      readonly [X in K]: [X, Pick<TObj, X>[X]];
    }>[]
  : never;

export type Predicate<T> = (value: unknown) => value is T;

export type ObjectChecker<T extends object> = {
  [K in keyof T]: Predicate<T[K]>;
};

export type AnyNonNullishValue = NonNullable<unknown>;

export type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType];
} & AnyNonNullishValue;

/** Any function with arguments */
export type UnknownFunction = (...args: unknown[]) => unknown;

export type NeverFunction = (...args: never[]) => unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => unknown;
