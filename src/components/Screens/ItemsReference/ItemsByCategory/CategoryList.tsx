import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import TouchableScale from "react-native-touchable-scale";
import {
  Category,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import { AI_CENTER } from "../../../../shared/sharedStyles";

type Props = {
  category: Category;
};

const CategoryList: FC<Props> = ({ category }): JSX.Element => {
  const navigation =
    useNavigation<StackNavigationProp<ItemsReferenceStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByCategoryListItems", { category });
  }, [navigation, category]);

  return (
    <ListItem
      containerStyle={[AI_CENTER, styles.accordionContainer]}
      bottomDivider
      Component={TouchableScale}
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{category}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    justifyContent: "space-between",
  },
});

export default memo<Props>(CategoryList);
