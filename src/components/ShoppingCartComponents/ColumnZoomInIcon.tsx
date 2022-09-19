import { FC, memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ColumnZoomInIcon: FC = (): JSX.Element => {
  return (
    <MaterialCommunityIcons name="magnify-close" size={30} color="black" />
  );
};

export default memo(ColumnZoomInIcon);
