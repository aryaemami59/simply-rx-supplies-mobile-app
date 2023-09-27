import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";

import type { TabBarIconProps } from "../../types/tsHelpers";

type Props = TabBarIconProps;

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
