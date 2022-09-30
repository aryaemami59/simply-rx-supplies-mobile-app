import { FC, memo, useCallback } from "react";
import MinimizeIconNode from "./MinimizeIconNode";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import { Button } from "@rneui/themed";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import ExpandIconNode from "./ExpandIconNode";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
  onPress: () => void;
  open: boolean;
  reset: () => void;
};

const MinimizeButton: FC<Props> = ({
  itemObj,
  vendorName,
  onPress,
  open,
  reset,
}): JSX.Element => {
  const clickHandler = useCallback(() => {
    onPress();
    reset();
  }, [onPress, reset]);

  return (
    <>
      <Button
        icon={open ? MinimizeIconNode : ExpandIconNode}
        size="md"
        title={open ? "Minimize" : "Expand"}
        color="warning"
        onPress={clickHandler}
        buttonStyle={[JC_SPACE_EVENLY]}
      />
    </>
  );
};

export default memo<Props>(MinimizeButton);
