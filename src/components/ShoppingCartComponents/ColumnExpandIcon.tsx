import { FC, memo } from "react";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  props: string;
}

const ColumnExpandIcon: FC = (): JSX.Element => {
  return <AntDesign name="closecircleo" size={30} color="black" />;
};

export default memo(ColumnExpandIcon);
