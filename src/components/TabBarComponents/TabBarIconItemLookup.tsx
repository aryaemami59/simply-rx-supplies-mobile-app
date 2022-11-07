import { FontAwesome } from "@expo/vector-icons";
import { FC, memo } from "react";
import { tabBarIconProps } from "../../../custom_types/missingTypes";
import { AI_CENTER } from "../../shared/styles/sharedStyles";

type Props = tabBarIconProps;

const TabBarIconItemLookup: FC<Props> = ({ color, size, focused }) => (
  <FontAwesome
    name="search"
    color={color}
    size={size}
    style={AI_CENTER}
  />
);

export default memo<Props>(TabBarIconItemLookup);
