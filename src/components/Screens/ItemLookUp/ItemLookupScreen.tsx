import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  ItemLookupStackParamList,
  ItemObjType,
} from "../../../../CustomTypes/types";
import { selectAllListItems } from "../../../redux/addedSlice";
import { useAppSelector } from "../../../redux/hooks";
import BottomSheetComponent from "./Input/BottomSheetComponent";
import InputField from "./Input/InputField";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";

const renderItems: ListRenderItem<ItemObjType> = ({ item }): JSX.Element => {
  return <SingleSearchResultsListItem itemObj={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = NativeStackScreenProps<
  ItemLookupStackParamList,
  "ItemLookupScreen"
>;

const ItemLookupScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.containerStyle,
        { backgroundColor: theme.colors.background },
      ]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "stretch",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 10,
  },
});

export default memo<Props>(ItemLookupScreen);
