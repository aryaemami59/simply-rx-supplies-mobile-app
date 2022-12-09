import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import { Share } from "react-native";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemNumber, selectItemSrc } from "../../../../redux/selectors";
import useItemName from "../../../../shared/hooks/useItemName";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import ShareIconNode from "./ShareIconNode";

type Props = {
  reset: () => void;
};

const ShareButton: FC<Props> = ({ reset }) => {
  const itemName = useItemName();
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
    Share.share(shareContent).catch(e => console.log(e));
  }, [reset, shareContent]);

  return (
    <Button
      icon={ShareIconNode}
      size="md"
      title="Share"
      color="success"
      onPress={shareInfo}
      buttonStyle={JC_SPACE_EVENLY}
    />
  );
};

export default memo<Props>(ShareButton);
