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
import { BACKGROUND_TRANSPARENT } from "../../shared/sharedStyles";

type Props = NativeStackHeaderProps;

const styles = StyleSheet.create({
  headerCenterContainer: {
    flex: 5,
  },
  headerRightContainer: {
    flex: 1,
  },
  searchBarContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInputContainer: {
    backgroundColor: SEARCH_BAR_COLOR,
    borderRadius: 9999,
  },
});

const rightContainerStyle = [JC_AI_CENTER, styles.headerRightContainer];

const containerStyle = [
  WIDTH_80,
  styles.searchBarContainer,
  BACKGROUND_TRANSPARENT,
];

const HeaderHomeStackNavigator: FC<Props> = ({
  navigation,
  route,
  options,
  back,
}) => {
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
      rightContainerStyle={rightContainerStyle}
      rightComponent={HeaderRightComponent}
      leftContainerStyle={DISPLAY_NONE}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={
        <SearchBar
          ref={inputRef}
          onFocus={focusHandler}
          containerStyle={containerStyle}
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

export default memo<Props>(HeaderHomeStackNavigator);
