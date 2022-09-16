import { useCallback, FC, memo } from "react";
import { selectAllListItems } from "../../redux/addedSlice";
import { useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { FlatList, StyleSheet } from "react-native";
import SingleInputListItem from "./SingleInputListItem";
import InputField from "./InputField";

const InputGroup: FC = (): JSX.Element => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);

  const renderItems = useCallback(({ item }): JSX.Element => {
    return <SingleInputListItem item={item} />;
  }, []);

  return (
    <>
      <InputField />
      <FlatList
        data={listItems}
        renderItem={renderItems}
        keyboardShouldPersistTaps="handled"
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
