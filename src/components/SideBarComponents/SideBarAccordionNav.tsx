import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ItemsReferenceStackParamList } from "../../../CustomTypes/types";

interface Props {
  category: string;
  // onPress: () => void;
}

const SideBarAccordionNav: FC<Props> = ({ category }): JSX.Element => {
  const navigation =
    useNavigation<StackNavigationProp<ItemsReferenceStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByCategoryListItems", { category });
  }, []);

  return (
    <ListItem
      containerStyle={styles.accordionContainerStyle}
      bottomDivider
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{category}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  accordionContainerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default memo<Props>(SideBarAccordionNav);
