import { FC, memo } from "react";
import { Button } from "@rneui/themed";

interface Props {
  props: string;
}

const HideItemName: FC = (): JSX.Element => {
  return <Button size="sm" title="Hide Item Name" />;
};

export default memo(HideItemName);
