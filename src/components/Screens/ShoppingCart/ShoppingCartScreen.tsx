import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { ListRenderItem } from "react-native";
import { FlatList, View } from "react-native";
import VendorNameProvider from "../../../shared/contexts/VendorNameProvider";
import useVendorNamesList from "../../../shared/hooks/useVendorNamesList";
import { HEIGHT_100 } from "../../../shared/styles/sharedStyles";
import type { VendorNameType } from "../../../types/api";
import type { ShoppingCartScreenProps } from "../../../types/navigation";
import CartVendorColumns from "./CartVendorColumns";

const renderItem: ListRenderItem<VendorNameType> = ({ item }) => (
  <VendorNameProvider vendorName={item}>
    <CartVendorColumns />
  </VendorNameProvider>
);

const keyExtractor = (item: VendorNameType) => item.toString();

type Props = ShoppingCartScreenProps;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }) => {
  const vendors = useVendorNamesList();
  const { background } = useTheme().theme.colors;

  const style = useMemo(
    () => [{ backgroundColor: background }, HEIGHT_100],
    [background]
  );

  return (
    <View style={style}>
      <FlatList
        data={vendors}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews
      />
    </View>
  );
};

export default memo<Props>(ShoppingCartScreen);
