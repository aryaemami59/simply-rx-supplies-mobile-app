import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";

import useVendorIds from "../../../../hooks/useVendorIds";
import VendorIdProvider from "../../../../shared/contexts/VendorIdProvider";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import type { ItemsReferenceTabScreenProps } from "../../../../types/navigation";
import type { KeyExtractor } from "../../../../types/tsHelpers";
import ItemsByVendorList from "./ItemsByVendorList";

const renderItem: ListRenderItem<number> = ({ item }) => (
  <VendorIdProvider vendorId={item}>
    <ItemsByVendorList />
  </VendorIdProvider>
);

const keyExtractor: KeyExtractor<number> = item => `${item}`;

type Props = ItemsReferenceTabScreenProps<"ItemsByVendor">;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }) => {
  const vendorIds = useVendorIds();
  const { background: backgroundColor } = useTheme().theme.colors;

  const style = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={style}>
      <FlatList
        keyExtractor={keyExtractor}
        removeClippedSubviews
        data={vendorIds}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorScreen);
