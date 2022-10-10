import { Button } from "@rneui/themed";
import { FC, memo, useCallback, useMemo } from "react";
import { Share } from "react-native";
import { VendorAndItemName } from "../../../../../CustomTypes/types";
import { selectItemNumber, selectItemSrc } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { JC_SPACE_EVENLY } from "../../../../shared/sharedStyles";
import ShareIconNode from "./ShareIconNode";

type Props = VendorAndItemName & {
  reset: () => void;
};

const ShareButton: FC<Props> = ({ itemName, vendorName, reset }) => {
  const itemNumber = useAppSelector(selectItemNumber(itemName));
  const src = useAppSelector(selectItemSrc(itemName));

  const shareContent = useMemo(
    () => ({
      title: `${itemNumber}`,
      message: `${itemName}`,
      url: src,
    }),
    [itemNumber, itemName, src]
  );

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
