import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo } from "react";
import TouchableScale from "react-native-touchable-scale";
import { ItemsReferenceStackParamList } from "../../../../../CustomTypes/navigation";
import {
  Category,
} from "../../../../../CustomTypes/types";
import { AI_CENTER, JC_SPACE_BETWEEN } from "../../../../shared/sharedStyles";

type Props = {
  category: Category;
};

const CategoryList: FC<Props> = ({ category }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ItemsReferenceStackParamList>>();
  const { background } = useTheme().theme.colors;

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByCategoryListItems", { category });
  }, [navigation, category]);

  const containerStyle = useMemo(
    () => [AI_CENTER, JC_SPACE_BETWEEN, { backgroundColor: background }],
    [background]
  );

  return (
    <ListItem
      containerStyle={containerStyle}
      bottomDivider
      Component={TouchableScale}
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{category}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(CategoryList);
