import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SearchBar as SearchBarType } from "@rneui/base";
import { Header, SearchBar, SearchBarProps } from "@rneui/themed";
import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Keyboard, StyleSheet, TextInput } from "react-native";
import {
  HeaderHomeStackNavigatorProps,
  RootTabNavigationProps,
  RootTabParamList,
} from "../../../CustomTypes/navigation";
import { SearchBarRef } from "../../../CustomTypes/types";
import {
  BACKGROUND_TRANSPARENT,
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

type Props = HeaderHomeStackNavigatorProps;

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
}) => {
  const searchRef = useRef<SearchBarRef>(null);
  const myNavigation = navigation as BottomTabNavigationProp<RootTabParamList>;

  const focusHandler = useCallback(() => {
    const ref = searchRef.current;
    myNavigation.navigate("ItemLookup", {
      inputFocused: true,
    });
    ref?.blur();
  }, [myNavigation]);

  return (
    <Header
      backgroundColor={MAIN_COLOR}
      rightContainerStyle={rightContainerStyle}
      rightComponent={HeaderRightComponent}
      leftContainerStyle={DISPLAY_NONE}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={
        <SearchBar
          ref={searchRef}
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
