import { FC, memo } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectVendorsArr } from "../../../redux/addedSlice";
import {
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
  View,
} from "react-native";
import CartVendorColumns from "./CartVendorColumns";
import { StackScreenProps } from "@react-navigation/stack";
import { vendorNameType } from "../../../../CustomTypes/types";
import { ShoppingCartStackParamList } from "../../../../CustomTypes/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@rneui/themed";
import { HEIGHT_100 } from "../../../shared/sharedStyles";

const renderItem: ListRenderItem<vendorNameType> = ({
  item,
}: ListRenderItemInfo<vendorNameType>) => {
  return <CartVendorColumns vendorName={item} />;
};

const keyExtractor = (item: vendorNameType) => item.toString();

type Props = StackScreenProps<ShoppingCartStackParamList, "ShoppingCartScreen">;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const vendors = useAppSelector(selectVendorsArr);
  const { theme } = useTheme();

  return (
    <>
      <View style={[{ backgroundColor: theme.colors.background }, HEIGHT_100]}>
        <FlatList
          data={vendors}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          removeClippedSubviews
        />
      </View>
    </>
  );
};

export default memo<Props>(ShoppingCartScreen);
