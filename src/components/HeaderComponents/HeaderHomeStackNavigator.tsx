import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Header, SearchBar } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import {
  BACKGROUND_TRANSPARENT,
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  SEARCH_BAR_COLOR,
  WIDTH_80,
} from "../../shared/styles/sharedStyles";
import type { SearchBarRef } from "../../types/missingTypes";
import type {
  HeaderHomeStackNavigatorProps,
  RootTabParamList,
} from "../../types/navigation";
import { itemLookup } from "../../types/navigation";
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
    // height: 50,
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
    myNavigation.navigate(itemLookup, {
      inputFocused: true,
    });
    ref?.blur();
  }, [myNavigation]);

  const centerComponent = useMemo(
    () => (
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
    ),
    [focusHandler]
  );

  return (
    <Header
      backgroundColor={MAIN_COLOR}
      rightContainerStyle={rightContainerStyle}
      rightComponent={HeaderRightComponent}
      leftContainerStyle={DISPLAY_NONE}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={centerComponent}
    />
  );
};

export default memo<Props>(HeaderHomeStackNavigator);
