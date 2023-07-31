import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";

import { useAppSelector } from "../../redux/hooks";
import { checkIfAnyItemsAdded } from "../../redux/selectors";
import type { TabBarIconProps } from "../../types/missingTypes";

type Props = TabBarIconProps;

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
