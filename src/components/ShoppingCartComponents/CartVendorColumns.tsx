import { Badge, ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { useAppSelector } from "../../redux/store";
import {
  selectVendorOfficialName,
  addedItemsLength,
} from "../../redux/addedSlice";
import { StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { useNavigation } from "@react-navigation/native";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  vendorName: string;
};

const CartVendorColumns: FC<Props> = ({ vendorName }): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));

  const navigation =
    useNavigation<StackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push(vendorName, { vendorName });
  }, []);

  return (
    <ListItem
      bottomDivider
      Component={TouchableScale}
      containerStyle={styles.accordionContainerStyle}
      onPress={clickHandler}
      pad={50}>
      <ListItem.Content>
        <>
          <ListItem.Title>{officialVendorName}</ListItem.Title>
          <Badge
            textStyle={{ fontWeight: "bold" }}
            status={addedItemsLen ? "success" : "primary"}
            value={addedItemsLen}
            containerStyle={styles.badgeContainerStyle}
          />
        </>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  accordionContainerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeContainerStyle: {
    position: "absolute",
    right: 60,
  },
  scrollViewContentContainerStyle: {
    alignItems: "center",
  },
  accordionChildrenViewStyle: {
    alignItems: "center",
    padding: 10,
    height: "100%",
  },
});

export default memo(CartVendorColumns);