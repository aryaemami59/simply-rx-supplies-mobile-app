import { Ionicons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../custom_types/missingTypes";

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
