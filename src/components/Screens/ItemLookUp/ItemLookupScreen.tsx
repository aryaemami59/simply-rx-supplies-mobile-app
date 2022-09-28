import { FC, memo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemLookupStackParamList,
  ItemObjType,
} from "../../../../CustomTypes/types";
import SingleSearchResultsListItem from "./SearchResults/SingleSearchResultsListItem";
import { useAppSelector } from "../../../redux/hooks";
import { selectAllListItems } from "../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import InputField from "./Input/InputField";
import BottomSheetComponent from "./Input/BottomSheetComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
  return <SingleSearchResultsListItem itemObj={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = StackScreenProps<ItemLookupStackParamList, "ItemLookupScreen">;

const ItemLookupScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const listItems = useAppSelector(selectAllListItems, shallowEqual);
  console.log(route.params);

  return (
    <View style={styles.containerStyle}>
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
