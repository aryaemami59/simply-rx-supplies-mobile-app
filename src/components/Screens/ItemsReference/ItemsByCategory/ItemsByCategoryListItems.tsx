import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useEffect, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";
import { shallowEqual } from "react-redux";

import { useAppSelector } from "../../../../redux/hooks";
import { selectCategoriesItemNames } from "../../../../redux/selectors";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { ItemName } from "../../../../types/api";
import type { KeyExtractor, RenderItem } from "../../../../types/missingTypes";
import type { ItemsReferenceStackScreenProps } from "../../../../types/navigation";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";

const renderItems: RenderItem<ItemName> = ({ item }) => (
  <ItemNameProvider itemName={item}>
    <ItemsByCategorySingleListItem />
  </ItemNameProvider>
);

const keyExtractor: KeyExtractor<ItemName> = item => item;

type Props = ItemsReferenceStackScreenProps<"ItemsByCategoryListItems">;

const ItemsByCategoryListItems: FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;
  const { background: backgroundColor } = useTheme().theme.colors;

  const categoryListItems = useAppSelector(
    selectCategoriesItemNames(category),
    shallowEqual
  );

  const options: NonNullable<Parameters<typeof navigation.setOptions>[number]> =
    useMemo(
      () => ({
        headerTitle: category,
      }),
      [category]
    );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const style: StyleProp<ViewStyle> = useMemo(
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
