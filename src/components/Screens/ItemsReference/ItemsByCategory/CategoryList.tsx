import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import TouchableScale from "react-native-touchable-scale";
import {
  Category,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import { AI_CENTER, JC_SPACE_BETWEEN } from "../../../../shared/sharedStyles";

type Props = {
  category: Category;
};

const CategoryList: FC<Props> = ({ category }): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ItemsReferenceStackParamList>>();
  const { theme } = useTheme();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByCategoryListItems", { category });
  }, [navigation, category]);

  return (
    <ListItem
      containerStyle={[
        AI_CENTER,
        JC_SPACE_BETWEEN,
        { backgroundColor: theme.colors.background },
      ]}
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
