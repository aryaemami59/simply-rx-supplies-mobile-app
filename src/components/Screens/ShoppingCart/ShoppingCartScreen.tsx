import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";

import useVendorIds from "../../../hooks/useVendorIds";
import VendorIdProvider from "../../../shared/contexts/VendorIdProvider";
import { HEIGHT_100 } from "../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../types/navigation";
import type { KeyExtractor } from "../../../types/tsHelpers";
import CartVendorColumns from "./CartVendorColumns";

const renderItem: ListRenderItem<number> = ({ item }) => (
  <VendorIdProvider vendorId={item}>
    <CartVendorColumns />
  </VendorIdProvider>
);

const keyExtractor: KeyExtractor<number> = item => item.toString();

type Props = ShoppingCartStackScreenProps<"ShoppingCartScreen">;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }) => {
  const vendorIds = useVendorIds();
  const { background } = useTheme().theme.colors;

  const style: StyleProp<ViewStyle> = useMemo(
    () => [{ backgroundColor: background }, HEIGHT_100],
    [background]
  );

  return (
    <View style={style}>
      <FlatList
        data={vendorIds}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews
      />
    </View>
  );
};

export default memo<Props>(ShoppingCartScreen);
