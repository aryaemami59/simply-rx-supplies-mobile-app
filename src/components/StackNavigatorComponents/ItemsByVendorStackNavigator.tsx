import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ItemsByVendorStackNavigatorProps } from "../../../CustomTypes/navigation";
import { VendorNameType } from "../../../CustomTypes/types";
import VendorNameProvider from "../../shared/contexts/VendorNameProvider";
import useVendorNamesList from "../../shared/customHooks/useVendorNamesList";
import { HEIGHT_100 } from "../../shared/sharedStyles";
import ItemsByVendorList from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorList";

const renderItem: ListRenderItem<VendorNameType> = ({ item }) => (
  <VendorNameProvider vendorName={item}>
    <ItemsByVendorList />
  </VendorNameProvider>
);

const keyExtractor = (item: VendorNameType) => item;

type Props = ItemsByVendorStackNavigatorProps;

const ItemsByVendorStackNavigator: FC<Props> = ({ navigation, route }) => {
  const allVendors = useVendorNamesList();
  const { background: backgroundColor } = useTheme().theme.colors;

  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor }],
    [backgroundColor]
  );

  return (
    <View style={style}>
      <FlatList
        keyExtractor={keyExtractor}
        removeClippedSubviews
        data={allVendors}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
      />
    </View>
  );
};

export default memo<Props>(ItemsByVendorStackNavigator);
