import { useNavigation } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo } from "react";
import TouchableScale from "react-native-touchable-scale";
import { ItemsByVendorStackNavigatorNavigationProps } from "../../../../../CustomTypes/navigation";
import useOfficialVendorName from "../../../../shared/customHooks/useOfficialVendorName";
import useVendorName from "../../../../shared/customHooks/useVendorName";
import { AI_CENTER, JC_SPACE_BETWEEN } from "../../../../shared/sharedStyles";

const ItemsByVendorList: FC = () => {
  const vendorName = useVendorName();
  const officialVendorName = useOfficialVendorName(vendorName);
  const { background: backgroundColor } = useTheme().theme.colors;

  const navigation =
    useNavigation<ItemsByVendorStackNavigatorNavigationProps>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByVendorListItems", { vendorName });
  }, [navigation, vendorName]);

  const containerStyle = useMemo(
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
