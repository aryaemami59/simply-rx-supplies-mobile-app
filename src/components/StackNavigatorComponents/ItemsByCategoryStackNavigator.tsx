import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import { ItemsReferenceTopTabParamList } from "../../../CustomTypes/navigation";
import { Category } from "../../../CustomTypes/types";
import { useAppSelector } from "../../redux/hooks";
import { selectCategoriesArr } from "../../redux/selectors";
import { HEIGHT_100 } from "../../shared/sharedStyles";
import CategoryList from "../Screens/ItemsReference/ItemsByCategory/CategoryList";

const renderItem: ListRenderItem<Category> = ({ item }) => (
  <CategoryList category={item} />
);

const keyExtractor = (item: Category) => item;

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByCategory"
>;

const ItemsByCategoryStackNavigator: FC<Props> = ({ navigation, route }) => {
  const categories = useAppSelector(selectCategoriesArr, shallowEqual);
  const { theme } = useTheme();
  const { background } = theme.colors;
  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor: background }],
    [background]
  );

  return (
    <View style={style}>
      <FlatList
        keyExtractor={keyExtractor}
        removeClippedSubviews
        data={categories}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
      />
    </View>
  );
};

export default memo<Props>(ItemsByCategoryStackNavigator);
