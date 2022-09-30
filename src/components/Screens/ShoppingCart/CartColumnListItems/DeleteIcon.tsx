import { FC, memo } from "react";
import { AntDesign } from "@expo/vector-icons";

const DeleteIcon: FC = (): JSX.Element => {
  return (
    <>
      <AntDesign name="delete" color="white" size={20} />
    </>
  );
};

export default memo(DeleteIcon);
