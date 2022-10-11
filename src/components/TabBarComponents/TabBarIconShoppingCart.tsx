import { Ionicons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";

type Props = tabBarIconProps;

const TabBarIconShoppingCart: FC<Props> = ({ color, size, focused }) => {
  const ifAdded = useAppSelector(checkIfAnyItemsAdded);
  const iconName = ifAdded ? "cart" : "cart-outline";

  return (
    <Ionicons
      name={iconName}
      color={color}
      size={30}
    />
  );
};

export default memo<Props>(TabBarIconShoppingCart);
