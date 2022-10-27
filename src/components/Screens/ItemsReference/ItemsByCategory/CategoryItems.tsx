import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useEffect, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  ItemName,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCategoriesItemNames } from "../../../../redux/selectors";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";

const renderItems: ListRenderItem<ItemName> = ({ item }) => (
  <ItemNameProvider itemName={item}>
    <ItemsByCategorySingleListItem />
  </ItemNameProvider>
);

const keyExtractor = (item: ItemName) => item;

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByCategoryListItems"
>;

const CategoryItems: FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;
  const { background } = useTheme().theme.colors;

  const categoryListItems = useAppSelector(
    selectCategoriesItemNames(category),
    shallowEqual
  );

  const options: NativeStackNavigationOptions = useMemo(
    () => ({
      headerTitle: category,
    }),
    [category]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor: background }],
    [background]
  );

  return (
    <View style={style}>
      <FlatList
        removeClippedSubviews
        data={categoryListItems}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default memo<Props>(CategoryItems);
