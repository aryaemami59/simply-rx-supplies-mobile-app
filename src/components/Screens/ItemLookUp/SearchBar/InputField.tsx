import { EvilIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import type { SearchBarBaseProps } from "@rneui/base/dist/SearchBar/types";
import type { HeaderProps } from "@rneui/themed";
import { Header, SearchBar, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { TextInputProps } from "react-native";
import { InteractionManager, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { shallowEqual } from "react-redux";
import { clearListItems, setListItems } from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectItemNamesArr } from "../../../../redux/selectors";
import useCountRender from "../../../../shared/hooks/useCountRender";
import useIsCurrentFocused from "../../../../shared/hooks/useIsCurrentFocused";
import useMounted from "../../../../shared/hooks/useMounted";
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
  CenterComponent,
  Icon,
  SearchBarRef,
} from "../../../../types/missingTypes";
import type { ItemLookupScreenProps } from "../../../../types/navigation";
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

const rightContainerStyle: HeaderProps["rightContainerStyle"] = [
  JC_AI_CENTER,
  styles.headerRightContainer,
];

const containerStyle: SearchBarBaseProps["containerStyle"] = [
  styles.searchBarContainer,
  BACKGROUND_TRANSPARENT,
];

const InputField: FC = () => {
  const { params } = useRoute<ItemLookupScreenProps["route"]>();
  const inputRef = useRef<SearchBarRef>(null);
  const view = useRef<AnimatableViewRef>(null);
  const [val, setVal] = useState("");
  const itemNames = useAppSelector(selectItemNamesArr, shallowEqual);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inputFocused = !!params?.inputFocused;
  // const [focused, setFocused] = useState(inputFocused);

  const focusHandler: NonNullable<TextInputProps["onFocus"]> = useCallback(
    e => {
      // e.currentTarget.focus();
      inputRef.current?.focus();
      view.current?.transitionTo(WIDTH_100);
      // console.log(e.currentTarget.focus());
      // console.log("focused");
      // setFocused(true);
    },
    []
  );

  const blurHandler: NonNullable<TextInputProps["onBlur"]> = useCallback(e => {
    view.current?.transitionTo(WIDTH_80);
    inputRef.current?.blur();
    // console.log(e);
    // console.log("blurred");
    // setFocused(false);
  }, []);

  const clearHandler: NonNullable<SearchBarBaseProps["onClear"]> =
    useCallback((): void => {
      setVal("");
      dispatch(clearListItems());
    }, [dispatch]);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  const navigation = useNavigation<ItemLookupScreenProps["navigation"]>();

  useMounted(InputField);
  useIsCurrentFocused(InputField);
  useCountRender(InputField);

  useFocusEffect(
    useCallback(() => {
      const ref = inputRef.current;
      navigation.addListener("focus", () => ref?.focus);
      navigation.addListener("blur", () => ref?.blur);
      console.log(inputFocused);
      // console.log(inputRef.current?.searchBar.input);
      //   const task = InteractionManager.runAfterInteractions(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        // inputRef.current?.focus();
        // ref?.focus();
        // focusHandler();
        //   if (inputFocused) {
        //   inputRef.current?.focus();
        // }
      });
      // else {
      //   inputRef.current?.blur();
      // }
      // });
      return () => {
        task.cancel();
        navigation.removeListener("focus", () => ref?.focus);
        navigation.removeListener("blur", () => ref?.blur);
        // inputRef.current?.blur();
        // inputRef.current?.focus();
        // console.log("unmount");
        // inputFocused ? ref?.focus() : ref?.blur();
        // inputFocused && ref?.focus();
        // if (inputFocused) {
        //   navigation.setParams({ inputFocused: true });
        // } else {
        //   navigation.setParams({ inputFocused: false });
        //   blurHandler();
        // }
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

  const changeVal: NonNullable<TextInputProps["onChangeText"]> = useCallback(
    (text: string) => {
      const listItems = search(text, itemNames);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, itemNames]
  );

  const clearIcon: Icon = useMemo(
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

  const centerComponent: CenterComponent = useMemo(
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
