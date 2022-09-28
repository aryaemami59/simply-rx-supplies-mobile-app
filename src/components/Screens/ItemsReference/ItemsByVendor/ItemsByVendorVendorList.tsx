import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ItemsReferenceStackParamList,
  officialVendorNameType,
  vendorNameType,
} from "../../../../../CustomTypes/types";

type Props = {
  vendorName: vendorNameType;
};

const ItemsByVendorVendorList: FC<Props> = ({ vendorName }): JSX.Element => {
  const officialVendorName: officialVendorNameType =
    useAppSelector<officialVendorNameType>(
      selectVendorOfficialName(vendorName)
    );

  const navigation =
    useNavigation<StackNavigationProp<ItemsReferenceStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByVendorListItems", { vendorName });
  }, [navigation, vendorName]);

  return (
    <ListItem
      containerStyle={styles.accordionContainerStyle}
      key={vendorName}
      bottomDivider
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{officialVendorName}</ListItem.Title>
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

export default memo<Props>(ItemsByVendorVendorList);
