import { useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ItemsByVendorListItemsProps } from "../../../../../CustomTypes/navigation";
import { ItemName } from "../../../../../CustomTypes/types";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useItemNames from "../../../../shared/customHooks/useItemNames";
import useOfficialVendorName from "../../../../shared/customHooks/useOfficialVendorName";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import SingleItemsByVendorListItem from "./SingleItemsByVendorListItem";

const keyExtractor = (item: ItemName) => item;

type Props = ItemsByVendorListItemsProps;

const ItemsByVendorListItems: FC<Props> = ({ navigation, route }) => {
  const { vendorName } = route.params;
  const officialVendorName = useOfficialVendorName(vendorName);

  const renderItems: ListRenderItem<ItemName> = useCallback(
    ({ item }) => (
      <ItemNameProvider itemName={item}>
        <VendorNameProvider vendorName={vendorName}>
          <SingleItemsByVendorListItem />
        </VendorNameProvider>
      </ItemNameProvider>
    ),
    [vendorName]
  );

  const itemNames = useItemNames(vendorName);

  const options = useMemo(
    () => ({
      headerTitle: officialVendorName,
    }),
    [officialVendorName]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { background } = useTheme().theme.colors;

  const style = useMemo(
    () => [{ backgroundColor: background }, HEIGHT_100],
    [background]
  );

  return (
    <View style={style}>
      <FlatList
        removeClippedSubviews
        data={itemNames}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorListItems);
