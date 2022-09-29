import { FC, memo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { selectNavsArr } from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  View,
} from "react-native";
import CategoryList from "./CategoryList";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import { useTheme } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ItemsByCategoryStackParamList,
  Category,
} from "../../../../../CustomTypes/types";

const renderItem: ListRenderItem<Category> = ({
  item,
}: ListRenderItemInfo<Category>) => {
  return <CategoryList category={item} />;
};

const keyExtractor = (item: Category) => item.toString();

type Props = NativeStackScreenProps<ItemsByCategoryStackParamList>;

const ItemsByCategoryScreen: FC<Props> = (): JSX.Element => {
  const categories = useAppSelector(selectNavsArr, shallowEqual);
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
