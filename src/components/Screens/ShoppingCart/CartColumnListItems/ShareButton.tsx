import { Button } from "@rneui/themed";
import { FC, memo, useCallback, useMemo } from "react";
import { Share } from "react-native";
import { ItemObjType, vendorNameType } from "../../../../../CustomTypes/types";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import ShareIconNode from "./ShareIconNode";

type Props = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
  reset: () => void;
};

const ShareButton: FC<Props> = ({
  itemObj,
  vendorName,
  reset,
}): JSX.Element => {
  const shareContent = useMemo(() => {
    return {
      title: `${itemObj.itemNumber}`,
      message: `${itemObj.name}`,
      url: itemObj.src,
    };
  }, [itemObj.itemNumber, itemObj.name, itemObj.src]);

  const shareInfo = useCallback(() => {
    reset();
    Share.share(shareContent);
  }, [reset, shareContent]);

  return (
    <Button
      icon={ShareIconNode}
      size="md"
      title="Share"
      color="success"
      onPress={shareInfo}
      buttonStyle={[JC_SPACE_EVENLY]}
    />
  );
};

export default memo<Props>(ShareButton);
