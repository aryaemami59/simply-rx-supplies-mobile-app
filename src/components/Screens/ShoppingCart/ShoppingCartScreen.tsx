import { FC, memo } from "react";
import { useAppSelector } from "../../../redux/store";
import { selectVendorsArr } from "../../../redux/addedSlice";
import { ScrollView } from "react-native";
import CartVendorColumns from "../../ShoppingCartComponents/CartVendorColumns";
import { StackScreenProps } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../../CustomTypes/types";

type Props = StackScreenProps<ShoppingCartStackParamList, "ShoppingCartScreen">;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const vendors = useAppSelector<string[]>(selectVendorsArr);

  return (
    <ScrollView>
      {vendors.map((e: string) => (
        <CartVendorColumns key={e} vendorName={e} />
      ))}
    </ScrollView>
  );
};

export default memo<Props>(ShoppingCartScreen);