import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useEffect, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  ItemObjType,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import { selectCategories } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";

const renderItems: ListRenderItem<ItemObjType> = ({ item }): JSX.Element => {
  return <ItemsByCategorySingleListItem itemObj={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = NativeStackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByCategoryListItems"
>;

const CategoryItems: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { category } = route.params;

  const categoryListItems = useAppSelector(
    selectCategories(category),
    shallowEqual
  );

  const options: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerTitle: category,
    };
  }, [category]);

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
