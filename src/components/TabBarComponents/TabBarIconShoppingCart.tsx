import { FC, memo } from "react";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";

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
