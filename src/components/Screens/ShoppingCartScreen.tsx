import { FC, memo } from "react";
import ParentShoppingCart from "../ShoppingCartComponents/ParentShoppingCart";

const ShoppingCartScreen: FC = (): JSX.Element => {
  return <ParentShoppingCart />;
};

export default memo(ShoppingCartScreen);
