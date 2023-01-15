import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";
import ItemNameProvider from "../../../../shared/contexts/ItemNameProvider";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useItemNames from "../../../../shared/hooks/useItemNames";
import useOfficialVendorName from "../../../../shared/hooks/useOfficialVendorName";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { ItemName } from "../../../../types/api";
import type { KeyExtractor, RenderItem } from "../../../../types/missingTypes";
import type { ItemsReferenceStackNavigatorProps } from "../../../../types/navigation";
import SingleItemsByVendorListItem from "./SingleItemsByVendorListItem";

const keyExtractor: KeyExtractor<ItemName> = item => item;

type Props = ItemsReferenceStackNavigatorProps<"ItemsByVendorListItems">;
// type Props = ItemsByVendorListItemsProps;

const ItemsByVendorListItems: FC<Props> = ({ navigation, route }) => {
  const { vendorName } = route.params;
  const officialVendorName = useOfficialVendorName(vendorName);

  const renderItems: RenderItem<ItemName> = useCallback(
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

  const options: NonNullable<Parameters<typeof navigation.setOptions>[number]> =
    useMemo(
      () => ({
        headerTitle: officialVendorName,
      }),
      [officialVendorName]
    );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { background } = useTheme().theme.colors;

  const style: StyleProp<ViewStyle> = useMemo(
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
