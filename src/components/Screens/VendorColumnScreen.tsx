import { FC, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { VendorColumnStackParamList } from "../../../CustomTypes/types";

interface Props {
  props: string;
}

const VendorColumnScreen: FC<Props> = ({ props }): JSX.Element => {
  const navigation =
    useNavigation<StackNavigationProp<VendorColumnStackParamList>>();
  return (
    <>
      <div></div>
    </>
  );
};

export default memo(VendorColumnScreen);
