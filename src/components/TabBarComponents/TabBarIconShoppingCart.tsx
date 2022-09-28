import { FC, memo } from "react";
import { checkIfAnyItemsAdded } from "../../redux/addedSlice";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "../../redux/hooks";

type Props = tabBarIconProps;

const TabBarIconShoppingCart: FC<Props> = ({
  color,
  size,
  focused,
}): JSX.Element => {
  const ifAdded = useAppSelector(checkIfAnyItemsAdded);
  const iconName = ifAdded ? "cart" : "cart-outline";

  return <Ionicons name={iconName} color={color} size={30} />;
};

export default memo<Props>(TabBarIconShoppingCart);
