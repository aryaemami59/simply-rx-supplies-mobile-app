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
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";

const renderItems: ListRenderItem<ItemName> = ({ item }) => (
  <ItemsByCategorySingleListItem itemName={item} />
);

const keyExtractor = (item: ItemName) => item;

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByCategoryListItems"
>;

const CategoryItems: FC<Props> = ({ navigation, route }) => {
  const { category } = route.params;

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
  const { theme } = useTheme();

  return (
    <View style={[HEIGHT_100, { backgroundColor: theme.colors.background }]}>
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
