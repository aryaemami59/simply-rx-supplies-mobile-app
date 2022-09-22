import { ListItem } from "@rneui/themed";
import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../../../redux/store";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleListItem from "../../../../shared/SingleListItem";
import { ScrollView } from "react-native";
import { ItemsReferenceStackParamList } from "../../../../../CustomTypes/types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  officialVendorNameType,
  ItemObjType,
} from "../../../../../CustomTypes/types";

type Props = StackScreenProps<
  ItemsReferenceStackParamList,
  "ItemsByVendorListItems"
>;

const ItemsByVendorListItems: FC<Props> = ({
  navigation,
  route,
}): JSX.Element => {
  const { vendorName } = route.params;
  const officialVendorName: officialVendorNameType =
    useAppSelector<officialVendorNameType>(
      selectVendorOfficialName(vendorName)
    );
  const items: ItemObjType[] = useAppSelector<ItemObjType[]>(
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
          <SingleListItem itemObj={e} />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default memo<Props>(ItemsByVendorListItems);
