import { ButtonGroup } from "@rneui/themed";
import { FC, memo } from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import ColumnZoomInIcon from "./ColumnZoomInIcon";

interface Props {
  props: string;
}

const ExpandCollapseButtonGroup: FC = (): JSX.Element => {
  return (
    <ButtonGroup
      containerStyle={{ borderWidth: 0 }}
      innerBorderStyle={{ width: 0 }}
      buttons={[
        <ColumnZoomInIcon />,
        <AntDesign name="minuscircleo" size={30} color="black" />,
        <AntDesign name="closecircleo" size={30} color="black" />,
      ]}
    />
  );
};

export default memo(ExpandCollapseButtonGroup);
