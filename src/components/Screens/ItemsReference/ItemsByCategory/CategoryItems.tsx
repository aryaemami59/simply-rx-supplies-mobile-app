import { useTheme } from "@rneui/themed";
import { FC, memo, useEffect, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import { CategoryItemsProps } from "../../../../../CustomTypes/navigation";
import { ItemName } from "../../../../../CustomTypes/types";
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

type Props = CategoryItemsProps;

const ItemsByCategoryListItems: FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;
  const { background: backgroundColor } = useTheme().theme.colors;

  const categoryListItems = useAppSelector(
    selectCategoriesItemNames(category),
    shallowEqual
  );

  const options = useMemo(
    () => ({
      headerTitle: category,
    }),
    [category]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
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

export default memo<Props>(ItemsByCategoryListItems);
