import { FC, memo, useEffect, useMemo } from "react";
import { selectCategories } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { shallowEqual } from "react-redux";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  View,
} from "react-native";
import {
  StackScreenProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  ItemsReferenceStackParamList,
  ItemObjType,
} from "../../../../../CustomTypes/types";
import ItemsByCategorySingleListItem from "./ItemsByCategorySingleListItem";
import { useTheme } from "@rneui/themed";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";

const renderItems: ListRenderItem<ItemObjType> = ({
  item,
}: ListRenderItemInfo<ItemObjType>): JSX.Element => {
  return <ItemsByCategorySingleListItem itemObj={item} />;
};

const keyExtractor = (item: ItemObjType) => item.id.toString();

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByCategoryListItems"
>;

const CategoryItems: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { category } = route.params;

  const categoryListItems = useAppSelector(
    selectCategories(category),
    shallowEqual
  );

  const options: StackNavigationOptions = useMemo(() => {
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
