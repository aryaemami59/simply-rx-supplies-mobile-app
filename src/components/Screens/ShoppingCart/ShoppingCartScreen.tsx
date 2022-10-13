import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import {
  ShoppingCartStackParamList,
  VendorNameType,
} from "../../../../CustomTypes/types";
import { useAppSelector } from "../../../redux/hooks";
import { selectVendorsArr } from "../../../redux/selectors";
import { HEIGHT_100 } from "../../../shared/sharedStyles";
import CartVendorColumns from "./CartVendorColumns";
import { shallowEqual } from "react-redux";

const renderItem: ListRenderItem<VendorNameType> = ({ item }) => (
  <CartVendorColumns vendorName={item} />
);

const keyExtractor = (item: VendorNameType) => item.toString();

type Props = NativeStackScreenProps<
  ShoppingCartStackParamList,
  "ShoppingCartScreen"
>;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }) => {
  const vendors = useAppSelector(selectVendorsArr, shallowEqual);
  const { theme } = useTheme();
  const { background } = theme.colors;

  return (
    <View style={[{ backgroundColor: background }, HEIGHT_100]}>
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
