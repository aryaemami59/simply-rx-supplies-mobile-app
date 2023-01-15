import { useNavigation } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import useOfficialVendorName from "../../../../shared/hooks/useOfficialVendorName";
import useVendorName from "../../../../shared/hooks/useVendorName";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
} from "../../../../shared/styles/sharedStyles";
import type { ItemsByVendorScreenNavigationProp } from "../../../../types/navigation";
import { itemsByVendorListItems } from "../../../../types/navigation";

const ItemsByVendorList: FC = () => {
  const vendorName = useVendorName();
  const officialVendorName = useOfficialVendorName(vendorName);
  const { background: backgroundColor } = useTheme().theme.colors;

  const navigation = useNavigation<ItemsByVendorScreenNavigationProp>();

  const clickHandler: NonNullable<PressableProps["onPress"]> =
    useCallback(() => {
      navigation.push(itemsByVendorListItems, { vendorName });
    }, [navigation, vendorName]);

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [AI_CENTER, JC_SPACE_BETWEEN, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <ListItem
      containerStyle={containerStyle}
      bottomDivider
      Component={TouchableScale}
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{officialVendorName}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default memo(ItemsByVendorList);
