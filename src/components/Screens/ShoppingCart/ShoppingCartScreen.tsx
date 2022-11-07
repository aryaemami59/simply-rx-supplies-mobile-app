import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ShoppingCartScreenProps } from "../../../../custom_types/navigation";
import { VendorNameType } from "../../../../custom_types/api";
import VendorNameProvider from "../../../shared/contexts/VendorNameProvider";
import useVendorNamesList from "../../../shared/hooks/useVendorNamesList";
import { HEIGHT_100 } from "../../../shared/styles/sharedStyles";
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
