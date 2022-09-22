import { FC, memo } from "react";
import { useAppSelector } from "../../redux/store";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";

type Props = tabBarIconProps;

const TabBarIconShoppingCart: FC<Props> = ({ color }): JSX.Element => {
  const ifAdded = useAppSelector(checkIfAnyItemsAdded);
  return (
    <>
      <Ionicons
        name={ifAdded ? "cart" : "cart-outline"}
        color={color}
        size={30}
      />
    </>
  );
};

export default memo<Props>(TabBarIconShoppingCart);
