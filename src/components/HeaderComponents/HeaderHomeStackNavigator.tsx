import { StackHeaderProps, StackNavigationProp } from "@react-navigation/stack";
import { Header, SearchBar } from "@rneui/themed";
import { FC, memo, useEffect, useRef, useCallback } from "react";
import { TextInput, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../CustomTypes/types";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { WIDTH_100, WIDTH_80 } from "../../shared/sharedStyles";
import {
  MAIN_COLOR,
  DISPLAY_NONE,
  COLOR_WHITE,
} from "../../shared/sharedStyles";
import { Keyboard } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const searchIcon = (
  <FontAwesome name="search" color="rgba(255,255,255,.5)" size={24} />
);

const clearIcon = <EvilIcons name="close" color="rgba(255,255,255,.5)" />;

type Props = NativeStackHeaderProps;
// type Props = StackHeaderProps;

const HeaderHomeStackNavigator: FC<Props> = ({
  navigation,
  route,
  options,
  back,
}): JSX.Element => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const inputRef = useRef<TextInput>(null);
  const isFocused = useIsFocused();
  !isFocused && inputRef.current?.blur();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      inputRef.current?.blur();
    });
    return unsubscribe;
  }, [navigation]);

  const focusHandler = useCallback(() => {
    navigation.navigate("ItemLookup", {
      screen: "ItemLookupScreen",
      params: {
        inputFocused: true,
      },
    });
    inputRef.current?.blur();
  }, [navigation]);

  return (
    <Header
      // containerStyle={{ height: 105 }}
      backgroundColor={MAIN_COLOR}
      leftContainerStyle={DISPLAY_NONE}
      rightContainerStyle={DISPLAY_NONE}
      centerComponent={
        <SearchBar
          ref={inputRef}
          onFocus={focusHandler}
          containerStyle={[WIDTH_80, styles.searchBarContainer]}
          placeholder="Search..."
          round
          showSoftInputOnFocus={false}
          focusable={false}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={COLOR_WHITE}
          placeholderTextColor="rgba(255,255,255,.5)"
          searchIcon={searchIcon}
          clearIcon={clearIcon}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInputContainer: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default memo<Props>(HeaderHomeStackNavigator);
