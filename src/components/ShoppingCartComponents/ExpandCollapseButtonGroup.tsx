import { ButtonGroup } from "@rneui/themed";
import { FC, memo } from "react";
import ColumnZoomInIcon from "./ColumnZoomInIcon";
import ColumnCollapseIcon from "./ColumnCollapseIcon";
import ColumnExpandIcon from "./ColumnExpandIcon";

const ExpandCollapseButtonGroup: FC = (): JSX.Element => {
  return (
    // <>
    //   <ColumnZoomInIcon />
    //   <ColumnCollapseIcon />
    //   <ColumnExpandIcon />
    // </>
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
