import { FC, memo } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectVendorsArr } from "../../../redux/addedSlice";
import { ScrollView } from "react-native";
import CartVendorColumns from "./CartVendorColumns";
import { StackScreenProps } from "@react-navigation/stack";
import {
  ShoppingCartStackParamList,
  vendorNameType,
} from "../../../../CustomTypes/types";

type Props = StackScreenProps<ShoppingCartStackParamList, "ShoppingCartScreen">;

const ShoppingCartScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const vendors = useAppSelector<vendorNameType[]>(selectVendorsArr);

  return (
    <ScrollView>
      {vendors.map((e: vendorNameType) => (
        <CartVendorColumns
          key={e}
          vendorName={e}
        />
      ))}
    </ScrollView>
  );
};

export default memo<Props>(ShoppingCartScreen);
