import { FC, memo } from "react";
import { AntDesign } from "@expo/vector-icons";

const ColumnCollapseIcon: FC = (): JSX.Element => {
  return <AntDesign name="minuscircleo" size={30} color="black" />;
};

export default memo(ColumnCollapseIcon);
