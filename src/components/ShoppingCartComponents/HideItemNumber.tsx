import { FC, memo } from "react";
import { Button } from "@rneui/themed";

interface Props {
  props: string;
}

const HideItemNumber: FC = (): JSX.Element => {
  return <Button size="sm" title="Hide Item Number" />;
};

export default memo(HideItemNumber);
