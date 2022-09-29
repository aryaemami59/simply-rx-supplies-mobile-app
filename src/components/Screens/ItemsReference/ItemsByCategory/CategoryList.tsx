import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TouchableScale from "react-native-touchable-scale";
import {
  Category,
  ItemsReferenceStackParamList,
} from "../../../../../CustomTypes/types";
import { AI_CENTER } from "../../../../shared/sharedStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
        styles.accordionContainer,
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

const styles = StyleSheet.create({
  accordionContainer: {
    justifyContent: "space-between",
  },
});

export default memo<Props>(CategoryList);
