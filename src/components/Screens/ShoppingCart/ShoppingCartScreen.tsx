import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import {
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../../CustomTypes/types";
import { selectVendorsArr } from "../../../redux/addedSlice";
import { useAppSelector } from "../../../redux/hooks";
import { HEIGHT_100 } from "../../../shared/sharedStyles";
import CartVendorColumns from "./CartVendorColumns";

const renderItem: ListRenderItem<vendorNameType> = ({ item }) => (
  <CartVendorColumns vendorName={item} />
);

const keyExtractor = (item: vendorNameType) => item.toString();

type Props = NativeStackScreenProps<
  ShoppingCartStackParamList,
  "ShoppingCartScreen"
>;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }) => {
  const vendors = useAppSelector(selectVendorsArr);
  const { theme } = useTheme();

  return (
    <View style={[{ backgroundColor: theme.colors.background }, HEIGHT_100]}>
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
