import { FC, memo } from "react";
import ItemsByVendorVendorList from "./ItemsByVendorVendorList";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsArr } from "../../../../redux/addedSlice";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ItemsByVendorStackParamList,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import {
  View,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
} from "react-native";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import { useTheme } from "@rneui/themed";

const renderItem: ListRenderItem<vendorNameType> = ({
  item,
}: ListRenderItemInfo<vendorNameType>) => {
  return <ItemsByVendorVendorList vendorName={item} />;
};

const keyExtractor = (item: vendorNameType) => item.toString();

type Props = StackScreenProps<
  ItemsByVendorStackParamList,
  "ItemsByVendorScreen"
>;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const allVendors = useAppSelector(selectVendorsArr);
  const { theme } = useTheme();

  return (
    <View style={[{ backgroundColor: theme.colors.background }, HEIGHT_100]}>
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
