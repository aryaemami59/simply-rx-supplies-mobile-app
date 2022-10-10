import { AntDesign } from "@expo/vector-icons";
import { FC, memo } from "react";

const DeleteIcon: FC = () => (
  <AntDesign
    name="delete"
    color="white"
    size={20}
  />
);

export default memo(DeleteIcon);
