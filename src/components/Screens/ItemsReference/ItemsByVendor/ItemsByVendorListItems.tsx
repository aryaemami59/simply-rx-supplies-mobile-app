import { FC, memo, useEffect, useMemo } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemsByVendor,
  selectVendorOfficialName,
} from "../../../../redux/addedSlice";
import { shallowEqual } from "react-redux";
import SingleListItem from "../../../../shared/SingleListItem";
import { FlatList, ListRenderItem, ListRenderItemInfo } from "react-native";
import { ItemsReferenceStackParamList } from "../../../../../CustomTypes/types";
import {
  StackScreenProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { ItemObjType } from "../../../../../CustomTypes/types";

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
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  const renderItems: ListRenderItem<ItemObjType> = ({
    item,
  }: ListRenderItemInfo<ItemObjType>): JSX.Element => {
    return <SingleListItem itemObj={item} vendorName={vendorName} />;
  };

  const items = useAppSelector(selectItemsByVendor(vendorName), shallowEqual);

  const options: StackNavigationOptions = useMemo(() => {
    return {
      headerTitle: officialVendorName,
    };
  }, [officialVendorName]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  return (
    <FlatList
      removeClippedSubviews
      data={items}
      renderItem={renderItems}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default memo<Props>(ItemsByVendorListItems);
