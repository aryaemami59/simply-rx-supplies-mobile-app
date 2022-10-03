import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { shallowEqual } from "react-redux";
import {
  Category,
  ItemsByCategoryStackParamList,
} from "../../../../../CustomTypes/types";
import { selectCategoriesArr } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import CategoryList from "./CategoryList";

const renderItem: ListRenderItem<Category> = ({ item }) => {
  return <CategoryList category={item} />;
};

const keyExtractor = (item: Category) => item.toString();

type Props = NativeStackScreenProps<ItemsByCategoryStackParamList>;

const ItemsByCategoryScreen: FC<Props> = (): JSX.Element => {
  const categories = useAppSelector(selectCategoriesArr, shallowEqual);
  const { theme } = useTheme();

  return (
    <View style={[HEIGHT_100, { backgroundColor: theme.colors.background }]}>
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

export default memo<Props>(ItemsByCategoryScreen);
