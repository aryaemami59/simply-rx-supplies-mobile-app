import { EvilIcons } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchBar as SearchBarType } from "@rneui/base";
import { Header, SearchBar, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { shallowEqual } from "react-redux";
import {
  ItemLookupStackParamList,
  ItemName,
  OnChangeText,
} from "../../../../../CustomTypes/types";
import {
  clearListItems,
  setListItems,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectItemsArr } from "../../../../redux/selectors";
import empty from "../../../../shared/empty";
import {
  COLOR_WHITE,
  DISPLAY_NONE,
  ICON_GRAY_COLOR,
  JC_AI_CENTER,
  MAIN_COLOR,
  WIDTH_100,
  WIDTH_80,
} from "../../../../shared/sharedStyles";
import HeaderRightComponent from "../../../HeaderComponents/HeaderRightComponent";
import SearchIcon from "../../../HeaderComponents/SearchIcon";

const sortResults = (
  searchTerm: ItemName,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.toLowerCase().match(re)) {
    return searchTerm.toLowerCase().match(re)!.length;
  }
  return 0;
};

const InputField: FC = () => {
  const [val, setVal] = useState("");
  const items = useAppSelector(selectItemsArr, shallowEqual);
  const view = useRef<Animatable.View & View>(null);
  const inputRef = useRef<SearchBarType & TextInput>(null);
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<ItemLookupStackParamList>>();
  const inputFocused = route.params?.inputFocused ? true : false;

  const focusHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_100);
  }, []);

  const blurHandler = useCallback(() => {
    view.current?.transitionTo(WIDTH_80);
  }, []);

  const clearHandler = useCallback((): void => {
    setVal("");
    dispatch(clearListItems());
  }, [dispatch]);

  const navigation =
    useNavigation<NativeStackNavigationProp<ItemLookupStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      inputFocused && inputRef.current?.focus();
      return () => {
        inputRef?.current?.searchBar?.input.isFocused()
          ? navigation.setParams({ inputFocused: true })
          : navigation.setParams({ inputFocused: false });
      };
    }, [inputFocused, navigation])
  );

  const listItemsFunc = useCallback(
    (text: string) => {
      const trimmedValue: string = text
        .trim()
        .toLowerCase()
        .replace(/\s{2,}/, " ");
      const reg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string, i: number, arr: string[]) =>
          i !== arr.length - 1 ? `(\\b(${f})+\\b)` : `(\\b(${f}))`
        )
        .join(".*");
      const looseReg = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re = new RegExp(`${reg}|${looseReg}`, "gi");
      return trimmedValue
        ? items
            .filter(itemName => itemName.toLowerCase().trim().match(re))
            .sort(
              (a, b) =>
                sortResults(b, re, trimmedValue) -
                sortResults(a, re, trimmedValue)
            )
            .slice(0, 50)
        : empty;
    },
    [items]
  );

  const changeVal: OnChangeText = useCallback(
    (text: string) => {
      const listItems = listItemsFunc(text);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
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

  return (
    <Header
      backgroundColor={MAIN_COLOR}
      containerStyle={styles.headerContainer}
      rightContainerStyle={[JC_AI_CENTER, styles.headerRightContainer]}
      leftContainerStyle={DISPLAY_NONE}
      rightComponent={HeaderRightComponent}
      centerContainerStyle={styles.headerCenterContainer}
      centerComponent={
        <Animatable.View
          ref={view}
          style={WIDTH_80}>
          <SearchBar
            returnKeyType="search"
            ref={inputRef}
            lightTheme
            keyboardAppearance={theme.mode}
            autoFocus
            focusable
            onFocus={focusHandler}
            onBlur={blurHandler}
            containerStyle={[styles.searchBarContainer]}
            placeholder="Search..."
            round
            inputContainerStyle={[styles.inputContainer]}
            onClear={clearHandler}
            onChangeText={changeVal}
            value={val}
            inputStyle={COLOR_WHITE}
            placeholderTextColor={ICON_GRAY_COLOR}
            searchIcon={SearchIcon}
            clearIcon={clearIcon}
          />
        </Animatable.View>
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
  headerContainer: {
    // height: 105,
  },
  inputContainer: {
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

export default memo(InputField);
