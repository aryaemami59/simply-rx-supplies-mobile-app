import { useCallback, FC, memo } from "react";
import { selectAllListItems } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
import SingleInputListItem from "./SingleInputListItem";
import InputField from "./InputField";
import { ItemObjType } from "../../../CustomTypes/types";
import BottomSheetComponent from "./BottomSheetComponent";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
  return <SingleInputListItem item={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

const InputGroup: FC = (): JSX.Element => {
  const listItems = useAppSelector<ItemObjType[]>(
    selectAllListItems,
    shallowEqual
  );

  return (
    <>
      <InputField />
      <BottomSheetComponent />
      <FlatList
        removeClippedSubviews
        maxToRenderPerBatch={5}
        data={listItems}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={7}
      />
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  inputContainerStyle: {
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  inputStyle: {
    color: "white",
  },
});

export default memo(InputGroup);
