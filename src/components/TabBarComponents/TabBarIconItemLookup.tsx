import { FontAwesome } from "@expo/vector-icons";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../CustomTypes/types";
import { AI_CENTER } from "../../shared/sharedStyles";

type Props = tabBarIconProps;

const TabBarIconItemLookup: FC<Props> = ({
  color,
  size,
  focused,
}): JSX.Element => {
  return (
    <FontAwesome
      name="search"
      color={color}
      size={size}
      style={AI_CENTER}
    />
  );
};

export default memo<Props>(TabBarIconItemLookup);
