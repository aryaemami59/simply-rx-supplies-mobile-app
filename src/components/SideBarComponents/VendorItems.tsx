import { ListItem } from "@rneui/themed";
import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleSideBarAccordionListItem from "./SingleSideBarAccordionListItem";
import { ScrollView } from "react-native";
import {
  ItemsReferenceStackParamList,
  ItemsByVendorStackParamList,
} from "../../../CustomTypes/types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  officialVendorNameType,
  itemInterface,
} from "../../../CustomTypes/types";

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByVendorListItems"
>;

const VendorItems: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { vendorName } = route.params;
  const officialVendorName: officialVendorNameType =
    useAppSelector<officialVendorNameType>(
      selectVendorOfficialName(vendorName)
    );
  const items: itemInterface[] = useAppSelector<itemInterface[]>(
    selectItemsByVendor(vendorName),
    shallowEqual
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: officialVendorName });
  }, []);

  return (
    <ScrollView>
      {items.map(e => (
        <ListItem key={e.id}>
          <SingleSideBarAccordionListItem itemObj={e} />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default memo<Props>(VendorItems);
