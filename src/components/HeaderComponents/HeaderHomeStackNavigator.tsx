import { useFocusEffect } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Header, SearchBar } from "@rneui/themed";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";
import {
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  SEARCH_BAR_COLOR,
  WIDTH_80,
} from "../../shared/sharedStyles";
import HeaderRightComponent from "./HeaderRightComponent";
import SearchClearIcon from "./SearchClearIcon";
import SearchIcon from "./SearchIcon";

type Props = NativeStackHeaderProps;

const HeaderHomeStackNavigator: FC<Props> = ({
  navigation,
  route,
  options,
  back,
}): JSX.Element => {
  const inputRef = useRef<TextInput>(null);
  useFocusEffect(() => {
    inputRef.current?.blur();
    Keyboard.dismiss();
  });

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
      backgroundColor={MAIN_COLOR}
      rightContainerStyle={[JC_AI_CENTER, styles.headerRightContainer]}
      rightComponent={HeaderRightComponent}
      leftContainerStyle={DISPLAY_NONE}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={
        <SearchBar
          ref={inputRef}
          onFocus={focusHandler}
          containerStyle={[WIDTH_80, styles.searchBarContainer]}
          placeholder="Search..."
          round
          showSoftInputOnFocus={false}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={COLOR_WHITE}
          placeholderTextColor={ICON_GRAY_COLOR}
          searchIcon={SearchIcon}
          clearIcon={SearchClearIcon}
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
    backgroundColor: SEARCH_BAR_COLOR,
  },
  headerCenterContainer: {
    flex: 5,
  },
  headerRightContainer: {
    flex: 1,
  },
});

export default memo<Props>(HeaderHomeStackNavigator);
