import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ItemsReferenceStackParamList,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import TouchableScale from "react-native-touchable-scale";

type Props = {
  vendorName: vendorNameType;
};

const ItemsByVendorVendorList: FC<Props> = ({ vendorName }): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const { theme } = useTheme();

  const navigation =
    useNavigation<StackNavigationProp<ItemsReferenceStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByVendorListItems", { vendorName });
  }, [navigation, vendorName]);

  return (
    <ListItem
      containerStyle={[
        styles.listItemContainer,
        { backgroundColor: theme.colors.background },
      ]}
      key={vendorName}
      bottomDivider
      Component={TouchableScale}
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{officialVendorName}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default memo<Props>(ItemsByVendorVendorList);
