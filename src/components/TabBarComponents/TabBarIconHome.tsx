import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";
import type { tabBarIconProps } from "../../types/missingTypes";

type Props = tabBarIconProps;

const TabBarIconHome: FC<Props> = ({ focused, color, size }) => {
  const iconName = focused ? "home" : "home-outline";

  return (
    <Ionicons
      name={iconName}
      color={color}
      size={size}
    />
  );
};

export default memo<Props>(TabBarIconHome);
