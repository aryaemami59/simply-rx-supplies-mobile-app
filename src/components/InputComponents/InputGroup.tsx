import React, {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { FC, memo } from "react";
import { Input, Button, SearchBar, Card, Icon } from "@rneui/themed";
import {
  clearListItems,
  itemInterface,
  selectItemsArr,
  setListItems,
  selectAllListItems,
} from "../../redux/addedSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { FlatList, ScrollView, Text, View } from "react-native";
import SingleInputListItem from "./SingleInputListItem";

const empty: [] = [];

const sortResults = (
  searchTerm: itemInterface,
  re: RegExp,
  trimmedValue: string
): number => {
  if (searchTerm.name.toLowerCase() === trimmedValue) {
    return 100;
  }
  if (searchTerm.name.toLowerCase().startsWith(trimmedValue)) {
    return 75;
  }
  if (searchTerm.name.toLowerCase().includes(trimmedValue)) {
    return 50;
  }
  if (searchTerm.name.toLowerCase().match(re)) {
    return searchTerm.name.toLowerCase().match(re)!.length;
  }
  return 0;
};

const InputGroup: FC = (): JSX.Element => {
  const items: itemInterface[] = useAppSelector<itemInterface[]>(
    selectItemsArr,
    shallowEqual
  );
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  const dispatch = useAppDispatch();
  const inputRef: RefObject<HTMLInputElement> = useRef<null>(null);
  const [val, setVal]: [string, Dispatch<SetStateAction<string>>] =
    useState<string>("");

  const clickHandler = useCallback((): void => {
    dispatch(clearListItems());
    setVal("");
    inputRef.current && inputRef.current.focus();
  }, [dispatch]);

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
      const looseReg: string = trimmedValue
        .split(/\s+/gi)
        .map((f: string) => `(?=.*${f})`)
        .join("");
      const re: RegExp = new RegExp(`${reg}|${looseReg}`, "gi");
      return trimmedValue
        ? items
            .filter(({ name }) => name.toLowerCase().trim().match(re))
            .slice(0, 50)
            .sort(
              (a, b) =>
                sortResults(b, re, trimmedValue) -
                sortResults(a, re, trimmedValue)
            )
        : empty;
    },
    [items]
  );

  const changeVal = useCallback(
    (text: string): void => {
      const listItems: itemInterface[] = listItemsFunc(text);
      setVal(text);
      dispatch(setListItems(listItems));
    },
    [dispatch, listItemsFunc]
  );

  const renderItems = ({ item }) => {
    return <SingleInputListItem itemObj={item} />;
  };

  return (
    <>
      <SearchBar
        lightTheme
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
          borderTopWidth: 0,
        }}
        placeholder="Search..."
        round
        inputContainerStyle={{
          borderRadius: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
        onClear={clickHandler}
        onChangeText={changeVal}
        value={val}
        inputStyle={{ color: "white" }}
        placeholderTextColor="rgba(255,255,255,.5)"
        searchIcon={
          <Icon
            name="search"
            color="rgba(255,255,255,.5)"
            type="font-awesome"
          />
        }
        clearIcon={
          <Icon name="close" color="rgba(255,255,255,.5)" type="EvilIcons" />
        }
      />
      {/* <ScrollView> */}
      <FlatList data={listItems} renderItem={renderItems} />
      {/* {listItems.map(e => (
          <SingleInputListItem key={e.id} itemObj={e} />
        ))}
      </ScrollView> */}
    </>
  );
};

export default memo(InputGroup);
