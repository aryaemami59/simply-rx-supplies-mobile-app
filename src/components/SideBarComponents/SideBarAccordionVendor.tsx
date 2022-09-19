import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import VendorItems from "./VendorItems";
import { useAppSelector } from "../../redux/store";
import {
  officialVendorNameType,
  selectVendorOfficialName,
  vendorNameType,
} from "../../redux/addedSlice";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ItemsReferenceStackParamList } from "../../../CustomTypes/types";

interface Props {
  vendorName: vendorNameType;
  // onPress: () => void;
}

const SideBarAccordionVendor: FC<Props> = ({
  vendorName,
  // onPress,
}): JSX.Element => {
  // const [expanded, setExpanded] = useState<boolean>(false);
  const officialVendorName: officialVendorNameType =
    useAppSelector<officialVendorNameType>(
      selectVendorOfficialName(vendorName)
    );
  // const clickHandler = useCallback((): void => {
  //   setExpanded((prev: boolean): boolean => !prev);
  // }, []);

  const navigation =
    useNavigation<StackNavigationProp<ItemsReferenceStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByVendorListItems", { vendorName });
  }, []);

  return (
    <ListItem.Accordion
      containerStyle={styles.accordionContainerStyle}
      key={vendorName}
      content={<ListItem.Title>{officialVendorName}</ListItem.Title>}
      // isExpanded={expanded}
      bottomDivider
      onPress={clickHandler}>
      {/* <SideBarAccordionListItems /> */}
    </ListItem.Accordion>
  );
};

const styles = StyleSheet.create({
  accordionContainerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default memo<Props>(SideBarAccordionVendor);
