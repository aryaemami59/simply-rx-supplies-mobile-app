import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { FontAwesome } from "@expo/vector-icons";

type Props = tabBarIconProps;

const TabBarIconItemLookup: FC<Props> = ({ color, size }): JSX.Element => {
  return (
    <FontAwesome
      name="search"
      color={color}
      size={size}
      style={{ alignItems: "center" }}
    />
  );
};

export default memo<Props>(TabBarIconItemLookup);
