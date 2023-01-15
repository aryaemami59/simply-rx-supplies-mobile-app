import { useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { FlatList, View } from "react-native";
import VendorNameProvider from "../../../shared/contexts/VendorNameProvider";
import useVendorNamesList from "../../../shared/hooks/useVendorNamesList";
import { HEIGHT_100 } from "../../../shared/styles/sharedStyles";
import type { VendorNameType } from "../../../types/api";
import type { KeyExtractor, RenderItem } from "../../../types/missingTypes";
import type { ShoppingCartStackScreenProps } from "../../../types/navigation";
import CartVendorColumns from "./CartVendorColumns";

const renderItem: RenderItem<VendorNameType> = ({ item }) => (
  <VendorNameProvider vendorName={item}>
    <CartVendorColumns />
  </VendorNameProvider>
);

const keyExtractor: KeyExtractor<VendorNameType> = item => item.toString();

// type Props = ShoppingCartStackScreenProps<"ShoppingCartScreen">;
type Props = ShoppingCartStackScreenProps<"ShoppingCartScreen">;
// type Props = ShoppingCartScreenProps;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }) => {
  // console.log(navigation.getParent()?.getState());
  // console.log(navigation.getState());
  // console.log(navigation.getParent()?.getState());
  // console.log(route);
  const vendors = useVendorNamesList();
  const { background } = useTheme().theme.colors;

  const style: StyleProp<ViewStyle> = useMemo(
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
