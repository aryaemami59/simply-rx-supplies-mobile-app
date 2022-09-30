import { FC, memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExpandIcon: FC = (): JSX.Element => {
  return (
    <>
      <MaterialCommunityIcons
        name="expand-all-outline"
        color="white"
        size={24}
      />
    </>
  );
};

export default memo(ExpandIcon);
