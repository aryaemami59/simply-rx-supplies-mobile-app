import { Header, SearchBar } from "@rneui/themed";
import { FC, memo, useEffect, useRef, useCallback } from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { FontAwesome, EvilIcons, Ionicons } from "@expo/vector-icons";
import { WIDTH_80, WIDTH_100, JC_AI_CENTER } from "../../shared/sharedStyles";
import {
  MAIN_COLOR,
  DISPLAY_NONE,
  COLOR_WHITE,
} from "../../shared/sharedStyles";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

const searchIcon = (
  <FontAwesome name="search" color="rgba(255,255,255,.5)" size={24} />
);

const clearIcon = <EvilIcons name="close" color="rgba(255,255,255,.5)" />;

type Props = NativeStackHeaderProps;

const HeaderHomeStackNavigator: FC<Props> = ({
  navigation,
  route,
  options,
  back,
}): JSX.Element => {
  const inputRef = useRef<TextInput>(null);
  // const isFocused = useIsFocused();
  // !isFocused && inputRef.current?.blur();
  useFocusEffect(() => {
    inputRef.current?.blur();
    Keyboard.dismiss();
    return () => {
      // inputRef.current?.blur();
      // Keyboard.dismiss();
    };
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
      rightComponent={<Ionicons name="contrast" color="white" size={30} />}
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
  headerCenterContainer: {
    flex: 5,
  },
  headerRightContainer: {
    flex: 1,
  },
});

export default memo<Props>(HeaderHomeStackNavigator);
