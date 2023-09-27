import { useNavigation } from "@react-navigation/native";
import { Badge, ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";

import useOfficialVendorName from "../../../hooks/useOfficialVendorName";
import useVendorId from "../../../hooks/useVendorId";
import { useAppSelector } from "../../../redux/hooks";
import { selectCartItemsLength } from "../../../redux/selectors";
import {
  AI_CENTER,
  FONT_WEIGHT_BOLD,
  JC_SPACE_BETWEEN,
} from "../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../types/navigation";
import { cartColumnListItems } from "../../../types/navigation";

const CartVendorColumns: FC = () => {
  const vendorId = useVendorId();
  const officialVendorName = useOfficialVendorName(vendorId);
  const cartItemsLength = useAppSelector(state =>
    selectCartItemsLength(state, vendorId)
  );
  const { background } = useTheme().theme.colors;

  const status = cartItemsLength ? "success" : "primary";

  const navigation =
    useNavigation<
      ShoppingCartStackScreenProps<"ShoppingCartScreen">["navigation"]
    >();

  const clickHandler = useCallback(() => {
    navigation.push(cartColumnListItems, { vendorId });
  }, [navigation, vendorId]);

  const containerStyle: StyleProp<ViewStyle> = useMemo(
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
            value={cartItemsLength}
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
