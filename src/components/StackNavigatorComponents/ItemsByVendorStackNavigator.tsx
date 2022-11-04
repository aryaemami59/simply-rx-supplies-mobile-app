import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { useTheme } from "@rneui/themed";
import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { ItemsReferenceTopTabParamList } from "../../../CustomTypes/navigation";
import { VendorNameType } from "../../../CustomTypes/types";
import VendorNameProvider from "../../shared/contexts/VendorNameProvider";
import useVendorNamesList from "../../shared/customHooks/useVendorNamesList";
import { HEIGHT_100 } from "../../shared/sharedStyles";
import ItemsByVendorVendorList from "../Screens/ItemsReference/ItemsByVendor/ItemsByVendorVendorList";

const renderItem: ListRenderItem<VendorNameType> = ({ item }) => (
  <VendorNameProvider vendorName={item}>
    <ItemsByVendorVendorList />
  </VendorNameProvider>
);

const keyExtractor = (item: VendorNameType) => item;

type Props = MaterialTopTabScreenProps<
  ItemsReferenceTopTabParamList,
  "ItemsByVendor"
>;

const ItemsByVendorStackNavigator: FC<Props> = ({ navigation, route }) => {
  const allVendors = useVendorNamesList();
  const { background } = useTheme().theme.colors;

  const style = useMemo(
    () => [HEIGHT_100, { backgroundColor: background }],
    [background]
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
