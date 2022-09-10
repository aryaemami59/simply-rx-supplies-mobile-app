import { ButtonGroup } from "@rneui/themed";
import { FC, memo } from "react";
import ColumnZoomInIcon from "./ColumnZoomInIcon";
import ColumnCollapseIcon from "./ColumnCollapseIcon";
import ColumnExpandIcon from "./ColumnExpandIcon";

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
        <ColumnCollapseIcon />,
        <ColumnExpandIcon />,
      ]}
    />
  );
};

export default memo(ExpandCollapseButtonGroup);
