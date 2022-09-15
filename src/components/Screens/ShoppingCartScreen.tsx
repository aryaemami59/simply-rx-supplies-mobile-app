import { FC, memo } from "react";
import ParentShoppingCart from "../ShoppingCartComponents/ParentShoppingCart";
import { StackScreenProps } from "@react-navigation/stack";
import { ShoppingCartStackParamList } from "../../../CustomTypes/types";

// type Props = StackScreenProps<ShoppingCartStackParamList, "ShoppingCartScreen">;

const ShoppingCartScreen: FC = (): JSX.Element => {
  return <ParentShoppingCart />;
};

export default memo(ShoppingCartScreen);
