import { FC, memo } from "react";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  props: string;
}

const ColumnCollapseIcon: FC = (): JSX.Element => {
  return <AntDesign name="minuscircleo" size={30} color="black" />;
};

export default memo(ColumnCollapseIcon);
