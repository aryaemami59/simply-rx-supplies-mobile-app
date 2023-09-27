import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
import type { ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";

import useItemIds from "../../../../hooks/useItemIds";
import useOfficialVendorName from "../../../../hooks/useOfficialVendorName";
import ItemIdProvider from "../../../../shared/contexts/ItemIdProvider";
import VendorIdProvider from "../../../../shared/contexts/VendorIdProvider";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { ItemsReferenceStackScreenProps } from "../../../../types/navigation";
import type { KeyExtractor } from "../../../../types/tsHelpers";
import SingleItemsByVendorListItem from "./SingleItemsByVendorListItem";

const keyExtractor: KeyExtractor<number> = item => `${item}`;

type Props = ItemsReferenceStackScreenProps<"ItemsByVendorListItems">;

const ItemsByVendorListItems: FC<Props> = ({ navigation, route }) => {
  const { vendorId } = route.params;
  const officialVendorName = useOfficialVendorName(vendorId);

  const renderItems = useCallback<ListRenderItem<number>>(
    ({ item }) => (
      <ItemIdProvider itemId={item}>
        <VendorIdProvider vendorId={vendorId}>
          <SingleItemsByVendorListItem />
        </VendorIdProvider>
      </ItemIdProvider>
    ),
    [vendorId]
  );

  const itemIds = useItemIds(vendorId);

  const options = useMemo<
    NonNullable<Parameters<typeof navigation.setOptions>[0]>
  >(
    () => ({
      headerTitle: officialVendorName,
    }),
    [officialVendorName]
  );

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { background } = useTheme().theme.colors;

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [{ backgroundColor: background }, HEIGHT_100],
    [background]
  );

  return (
    <View style={style}>
      <FlatList
        removeClippedSubviews
        data={itemIds}
        renderItem={renderItems}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorListItems);
