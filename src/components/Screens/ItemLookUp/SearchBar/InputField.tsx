import { EvilIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Header, SearchBar, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { shallowEqual } from "react-redux";
import { clearListItems, setListItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectItemNamesArr } from "../../../../redux/selectors";
import {
  BACKGROUND_TRANSPARENT,
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  SEARCH_BAR_COLOR,
  WIDTH_100,
  WIDTH_80,
} from "../../../../shared/styles/sharedStyles";
import type {
  AnimatableViewRef,
  OnChangeText,
  SearchBarRef,
} from "../../../../types/missingTypes";
import type {
  ItemLookupNavigationProps,
  ItemLookupRouteProps,
} from "../../../../types/navigation";
import search from "../../../../utils/search";
import HeaderRightComponent from "../../../HeaderComponents/HeaderRightComponent";
import SearchIcon from "../../../HeaderComponents/SearchIcon";

const styles = StyleSheet.create({
  headerCenterContainer: {
    flex: 5,
  },
  headerRightContainer: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: SEARCH_BAR_COLOR,
    borderRadius: 9999,
  },
  searchBarContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

const rightContainerStyle = [JC_AI_CENTER, styles.headerRightContainer];

const containerStyle = [styles.searchBarContainer, BACKGROUND_TRANSPARENT];

const InputField: FC = () => {
  const { params } = useRoute<ItemLookupRouteProps>();
  const inputRef = useRef<SearchBarRef>(null);
  const view = useRef<AnimatableViewRef>(null);
  const [val, setVal] = useState("");
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inputFocused = !!params?.inputFocused;
  // const [focused, setFocused] = useState(inputFocused);

  const focusHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_100);
    // setFocused(true);
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_80);
    // setFocused(false);
  }, []);

  const clearHandler = useCallback((): void => {
    setVal("");
    dispatch(clearListItems());
  }, [dispatch]);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  const navigation = useNavigation<ItemLookupNavigationProps>();

  useFocusEffect(
    useCallback(() => {
      const ref = inputRef.current;
      //   const task = InteractionManager.runAfterInteractions(() => {
      inputFocused ? ref?.focus() : ref?.blur();
      // });
      return () => {
        // inputFocused ? ref?.focus() : ref?.blur();
        // inputFocused && ref?.focus();
        inputFocused
          ? navigation.setParams({ inputFocused: true })
          : navigation.setParams({ inputFocused: false });
      };
    }, [inputFocused, navigation])
  );

  // useEffect(() => {
  //   const ref = inputRef.current;
  //   focused && ref?.focus();
  //   return () => {
  //     ref?.blur();
  //     ref?.searchBar?.input.isFocused()
  //       ? navigation.setParams({ inputFocused: true })
  //       : navigation.setParams({ inputFocused: false });
  //   };
  // }, [focused]);

  const changeVal: OnChangeText = useCallback(
    (text: string) => {
      const listItems = search(text, itemNames);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, itemNames]
  );

  const clearIcon = useMemo(
    () => (
      <EvilIcons
        name="close"
        color={ICON_GRAY_COLOR}
        onPress={clearHandler}
        size={24}
      />
    ),
    [clearHandler]
  );

  const centerComponent = useMemo(
    () => (
      <Animatable.View
        // easing="ease-in-out"
        // animation="ease-in-out"
        // useNativeDriver
        ref={view}
        style={WIDTH_80}>
        <SearchBar
          // onKeyboardHide={}
          returnKeyType="search"
          ref={inputRef}
          // lightTheme
          keyboardAppearance={theme.mode}
          // autoFocus
          // focusable
          onFocus={focusHandler}
          onBlur={blurHandler}
          containerStyle={containerStyle}
          placeholder="Search..."
          round
          inputContainerStyle={styles.inputContainer}
          onClear={clearHandler}
          onChangeText={changeVal}
          value={val}
          inputStyle={COLOR_WHITE}
          placeholderTextColor={ICON_GRAY_COLOR}
          searchIcon={SearchIcon}
          clearIcon={clearIcon}
        />
      </Animatable.View>
    ),
    [
      blurHandler,
      changeVal,
      clearHandler,
      clearIcon,
      focusHandler,
      theme.mode,
      val,
    ]
  );

  return (
    <Header
      backgroundColor={MAIN_COLOR}
      rightContainerStyle={rightContainerStyle}
      leftContainerStyle={DISPLAY_NONE}
      rightComponent={HeaderRightComponent}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={centerComponent}
    />
  );
};

export default memo(InputField);
