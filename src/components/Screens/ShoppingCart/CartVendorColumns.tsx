import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Badge, ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import {
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../../CustomTypes/types";
import {
  addedItemsLength,
  selectVendorOfficialName,
} from "../../../redux/addedSlice";
import { useAppSelector } from "../../../redux/hooks";
import {
  AI_CENTER,
  FONT_WEIGHT_BOLD,
  JC_SPACE_BETWEEN,
} from "../../../shared/sharedStyles";

type Props = {
  vendorName: vendorNameType;
};

const CartVendorColumns: FC<Props> = ({ vendorName }): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const addedItemsLen = useAppSelector(addedItemsLength(vendorName));
  const { theme } = useTheme();

  const status = addedItemsLen ? "success" : "primary";

  const navigation =
    useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("CartColumnListItems", { vendorName });
  }, [navigation, vendorName]);

  return (
    <ListItem
      bottomDivider
      Component={TouchableScale}
      containerStyle={[
        AI_CENTER,
        JC_SPACE_BETWEEN,
        { backgroundColor: theme.colors.background },
      ]}
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

export default memo<Props>(CartVendorColumns);
