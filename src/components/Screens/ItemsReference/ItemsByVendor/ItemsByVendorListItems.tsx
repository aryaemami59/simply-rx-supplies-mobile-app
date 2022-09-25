import { ListItem } from "@rneui/themed";
import { FC, memo, useEffect } from "react";
import { useAppSelector } from "../../../../redux/store";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleListItem from "../../../../shared/SingleListItem";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
} from "react-native";
import { ItemsReferenceStackParamList } from "../../../../../CustomTypes/types";
import { StackScreenProps } from "@react-navigation/stack";
import {
  officialVendorNameType,
  ItemObjType,
} from "../../../../../CustomTypes/types";

const keyExtractor = (item: ItemObjType) => item.id.toString();

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

  const renderItems: ListRenderItem<ItemObjType> = ({
    item,
  }: ListRenderItemInfo<ItemObjType>): JSX.Element => {
    return (
      <SingleListItem
        itemObj={item}
        vendorName={vendorName}
      />
    );
  };

  const items: ItemObjType[] = useAppSelector<ItemObjType[]>(
    selectItemsByVendor(vendorName),
    shallowEqual
  );

  useEffect(() => {
    navigation.setOptions({ headerTitle: officialVendorName });
  }, []);

  return (
    <FlatList
      removeClippedSubviews
      data={items}
      renderItem={renderItems}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
      extraData={vendorName}
    />
    // <ScrollView>
    //   {items.map(e => (
    //     <SingleListItem
    //       key={`ItemsByVendorListItems${e.id}`}
    //       itemObj={e}
    //     />
    //   ))}
    // </ScrollView>
  );
};

export default memo<Props>(ItemsByVendorListItems);
