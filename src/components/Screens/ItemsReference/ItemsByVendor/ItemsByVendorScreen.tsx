import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { VendorNameType } from "../../../../../custom_types/api";
import { ItemsByVendorScreenProps } from "../../../../../custom_types/navigation";
import VendorNameProvider from "../../../../shared/contexts/VendorNameProvider";
import useVendorNamesList from "../../../../shared/hooks/useVendorNamesList";
import { HEIGHT_100 } from "../../../../shared/styles/sharedStyles";
import ItemsByVendorList from "./ItemsByVendorList";

const renderItem: ListRenderItem<VendorNameType> = ({ item }) => (
  <VendorNameProvider vendorName={item}>
    <ItemsByVendorList />
  </VendorNameProvider>
);

const keyExtractor = (item: VendorNameType) => item;

type Props = ItemsByVendorScreenProps;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }) => {
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

export default memo<Props>(ItemsByVendorScreen);
