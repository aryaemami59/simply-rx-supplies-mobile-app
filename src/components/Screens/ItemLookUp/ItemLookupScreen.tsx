import { FC, memo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
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
import { useTheme } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
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
        // keyboardShouldPersistTaps="always"
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
