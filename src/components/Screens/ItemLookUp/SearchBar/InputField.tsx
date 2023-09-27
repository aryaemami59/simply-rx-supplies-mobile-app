import { EvilIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SearchBar } from "@rneui/base";
import type { SearchBarBaseProps } from "@rneui/base/dist/SearchBar/types";
import type { HeaderProps } from "@rneui/themed";
import { Header } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { TextInputProps } from "react-native";
import { InteractionManager, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import useComponentMountLogger from "../../../../hooks/loggers/useComponentMountLogger";
import useComponentUpdateLogger from "../../../../hooks/loggers/useComponentUpdateLogger";
import useIsCurrentFocused from "../../../../hooks/loggers/useIsCurrentFocused";
import {
  clearSearchResults,
  setSearchResults,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectItemNamesAndKeywords } from "../../../../redux/selectors";
import {
  BACKGROUND_TRANSPARENT,
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  SEARCH_BAR_COLOR,
  WIDTH_80,
  WIDTH_100,
} from "../../../../shared/styles/sharedStyles";
import type { RootTabScreenProps } from "../../../../types/navigation";
import type {
  AnimatableViewRef,
  CenterComponent,
  Icon,
  SearchBarRef,
} from "../../../../types/tsHelpers";
import EMPTY_ARRAY from "../../../../utils/emptyArray";
import isEmptyArray from "../../../../utils/predicates/isEmptyArray";
import search from "../../../../utils/search/search";
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
  const route = useRoute<RootTabScreenProps<"ItemLookup">["route"]>();
  // const focused = useRef<boolean>(true);
  const inputRef = useRef<SearchBarRef>(null);
  const view = useRef<AnimatableViewRef>(null);
  const [val, setVal] = useState("");

  // useEffect(() => {
  //   console.log(params);
  // }, [params]);
  // useDependencyChangeLogger(params, "params");
  const itemNamesAndKeywords = useAppSelector(selectItemNamesAndKeywords);
  // const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { inputFocused } = route.params;
  // const [focused, setFocused] = useState(true);
  const navigation =
    useNavigation<RootTabScreenProps<"ItemLookup">["navigation"]>();

  const focusHandler: NonNullable<TextInputProps["onFocus"]> = useCallback(
    e => {
      view.current?.transitionTo(WIDTH_100);
      // navigation.setParams({ inputFocused: true });
      // setFocused(true);
      // console.log("focusHandler");
      return true;
    },
    []
  );

  const blurHandler: NonNullable<TextInputProps["onBlur"]> = useCallback(e => {
    view.current?.transitionTo(WIDTH_80);
    // view.current.
    // navigation.setParams({ inputFocused: false });
    // setFocused(prev => {
    //   view.current?.transitionTo(WIDTH_80);
    //   return false;
    // });
    // setFocused(false);
    // focused.current = false;
    // inputFocused && navigation.setParams({ inputFocused: false });
    // console.log("blurHandler");
    return false;
  }, []);

  const clearHandler = useCallback<
    NonNullable<SearchBarBaseProps["onClear"]>
  >(() => {
    setVal("");
    dispatch(clearSearchResults());
  }, [dispatch]);

  useComponentMountLogger();
  useIsCurrentFocused();
  useComponentUpdateLogger();

  // useEffect(() => {
  // console.log(focused);
  // console.log(inputRef.current?.focus());
  // setFocused(inputFocused);
  // focused && inputRef.current?.focus();
  // }, [inputFocused]);

  // useEffect(() => {
  // console.log();
  // setFocused(inputFocused);
  // focused ? inputRef.current?.focus() : inputRef.current?.blur();
  // }, [inputFocused]);

  useFocusEffect(
    useCallback(() => {
      // const ref = inputRef.current;
      // console.log(focused);
      const task = InteractionManager.runAfterInteractions(() => {
        // console.log(inputFocused);
        // console.log(inputRef.current?.onFocus);
        // inputFocused
        //   ? navigation.setParams({ inputFocused: true })
        //   : navigation.setParams({ inputFocused: false });
        // focused && ref?.focus();
        if (inputFocused) {
          inputRef.current?.focus();
        }
        // inputFocused ? inputRef.current?.focus() : inputRef.current?.blur();
      });
      return () => {
        // console.log(focused);
        // focused ? inputRef.current?.focus() : inputRef.current?.blur();
        // navigation.setParams({ inputFocused });
        blurHandler();
        // inputRef.current?.blur();
        if (inputFocused) {
          navigation.setParams({ inputFocused: true });
        } else {
          navigation.setParams({ inputFocused: false });
        }
        task.cancel();
      };
    }, [blurHandler, inputFocused, navigation])
  );

  const changeVal = useCallback<NonNullable<TextInputProps["onChangeText"]>>(
    (text: string) => {
      const listItems = search(text, itemNamesAndKeywords);
      setVal(text);
      const searchResultsIds = isEmptyArray(listItems)
        ? EMPTY_ARRAY
        : listItems.map<number>(({ id }) => id);
      if (isEmptyArray(searchResultsIds)) {
        dispatch(clearSearchResults());
      }
      dispatch(setSearchResults(searchResultsIds));
    },
    [dispatch, itemNamesAndKeywords]
  );

  const clearIcon = useMemo<Icon>(
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

  const centerComponent = useMemo<CenterComponent>(
    () => (
      <Animatable.View
        // onTransitionBegin={}
        // easing="ease-in-out"
        // animation="ease-in-out"
        // useNativeDriver
        ref={view}
        style={WIDTH_80}>
        <SearchBar
          // onKeyboardHide={}
          returnKeyType="search"
          // ref={}
          ref={inputRef}
          // lightTheme
          // keyboardAppearance={theme.mode}
          autoFocus
          focusable
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
      // theme.mode,
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
