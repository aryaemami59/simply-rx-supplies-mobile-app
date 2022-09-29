import { FC, memo } from "react";
import ItemsByVendorVendorList from "./ItemsByVendorVendorList";
import { useAppSelector } from "../../../../redux/hooks";
import { selectVendorsArr } from "../../../../redux/addedSlice";
import { StackScreenProps } from "@react-navigation/stack";
import { ItemsByVendorStackParamList } from "../../../../../CustomTypes/types";
import { View } from "react-native";
import { HEIGHT_100 } from "../../../../shared/sharedStyles";
import { useTheme } from "@rneui/themed";

type Props = StackScreenProps<
  ItemsByVendorStackParamList,
  "ItemsByVendorScreen"
>;

const ItemsByVendorScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const allVendors = useAppSelector(selectVendorsArr);
  const { theme } = useTheme();

  return (
    <View style={[HEIGHT_100, { backgroundColor: theme.colors.background }]}>
      {allVendors.map(vendorName => (
        <ItemsByVendorVendorList key={vendorName} vendorName={vendorName} />
      ))}
    </View>
  );
};

export default memo<Props>(ItemsByVendorScreen);
