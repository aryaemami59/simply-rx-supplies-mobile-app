import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import type { TouchableWithoutFeedbackProps } from "react-native";

import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import type { Icon } from "../../../../types/missingTypes";
import ExpandIconNode from "./ExpandIconNode";
import MinimizeIconNode from "./MinimizeIconNode";

type Props = {
  onPress: () => void;
  open: boolean;
  reset: () => void;
};

const MinimizeButton: FC<Props> = ({ onPress, open, reset }) => {
  const clickHandler: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      onPress();
      reset();
    }, [onPress, reset]);

  const icon: Icon = open ? MinimizeIconNode : ExpandIconNode;
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
