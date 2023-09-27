import { useNavigation } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import TouchableScale from "react-native-touchable-scale";

import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import useVendorId from "../../../../hooks/useVendorId";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
} from "../../../../shared/styles/sharedStyles";
import type { ItemsReferenceTabScreenProps } from "../../../../types/navigation";
import { itemsByVendorListItems } from "../../../../types/navigation";

const ItemsByVendorList: FC = () => {
  const vendorId = useVendorId();
  const officialVendorName = useOfficialVendorName(vendorId);
  const { background: backgroundColor } = useTheme().theme.colors;

  const navigation =
    useNavigation<
      ItemsReferenceTabScreenProps<"ItemsByVendor">["navigation"]
    >();

  const clickHandler = useCallback<
    NonNullable<PressableProps["onPress"]>
  >(() => {
    navigation.push(itemsByVendorListItems, { vendorId });
  }, [navigation, vendorId]);

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
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
