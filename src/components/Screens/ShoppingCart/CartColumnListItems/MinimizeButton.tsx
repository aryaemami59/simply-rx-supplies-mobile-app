import { Button } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import ExpandIconNode from "./ExpandIconNode";
import MinimizeIconNode from "./MinimizeIconNode";

type Props = {
  onPress: () => void;
  open: boolean;
  reset: () => void;
};

const MinimizeButton: FC<Props> = ({ onPress, open, reset }) => {
  const clickHandler = useCallback(() => {
    onPress();
    reset();
  }, [onPress, reset]);

  const icon = open ? MinimizeIconNode : ExpandIconNode;
  const title = open ? "Minimize" : "Expand";

  return (
    <Button
      icon={icon}
      size="md"
      title={title}
      color="warning"
      onPress={clickHandler}
      buttonStyle={JC_SPACE_EVENLY}
    />
  );
};

export default memo<Props>(MinimizeButton);
