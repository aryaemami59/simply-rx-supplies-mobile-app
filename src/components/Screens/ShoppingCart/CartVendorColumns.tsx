import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Badge, ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { ShoppingCartStackParamList } from "../../../../CustomTypes/navigation";
import { useAppSelector } from "../../../redux/hooks";
import { addedItemsLength } from "../../../redux/selectors";
import useOfficialVendorName from "../../../shared/customHooks/useOfficialVendorName";
import useVendorName from "../../../shared/customHooks/useVendorName";
import {
  AI_CENTER,
  FONT_WEIGHT_BOLD,
  JC_SPACE_BETWEEN,
} from "../../../shared/sharedStyles";

const CartVendorColumns: FC = () => {
  const vendorName = useVendorName();
  const officialVendorName = useOfficialVendorName(vendorName);
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));
  const { background } = useTheme().theme.colors;

  const status = addedItemsLen ? "success" : "primary";

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("CartColumnListItems", { vendorName });
  }, [navigation, vendorName]);

  const containerStyle = useMemo(
    () => [AI_CENTER, JC_SPACE_BETWEEN, { backgroundColor: background }],
    [background]
  );

  return (
    <ListItem
      bottomDivider
      Component={TouchableScale}
      containerStyle={containerStyle}
      onPress={clickHandler}
      pad={50}>
      <ListItem.Content>
        <>
          <ListItem.Title>{officialVendorName}</ListItem.Title>
          <Badge
            textStyle={FONT_WEIGHT_BOLD}
            status={status}
            value={addedItemsLen}
            containerStyle={styles.badgeContainer}
          />
        </>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    right: 60,
  },
});

export default memo(CartVendorColumns);
