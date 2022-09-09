import { FC, memo } from "react";
import { Button } from "@rneui/themed";

interface Props {
  props: string;
}

const HideItemBarcode: FC = (): JSX.Element => {
  return <Button size="sm" title="Hide Item Barcode" />;
};

export default memo(HideItemBarcode);
