import { FC, memo } from "react";
import { Octicons } from "@expo/vector-icons";

const DetailsIcon: FC = (): JSX.Element => {
  return (
    <>
      <Octicons name="info" color="white" size={20} />
    </>
  );
};

export default memo(DetailsIcon);
