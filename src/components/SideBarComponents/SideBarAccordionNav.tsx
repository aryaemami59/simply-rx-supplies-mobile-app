import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";

interface Props {
  category: string;
  onPress: () => void;
}

const SideBarAccordionNav: FC<Props> = ({ category, onPress }): JSX.Element => {
  return (
    <ListItem
      containerStyle={styles.accordionContainerStyle}
      bottomDivider
      onPress={onPress}>
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
