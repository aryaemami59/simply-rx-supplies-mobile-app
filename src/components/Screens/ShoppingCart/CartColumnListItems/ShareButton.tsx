import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { ShareContent } from "react-native";
import { Share } from "react-native";

import useItemId from "../../../../hooks/useItemId";
import { useAppSelector } from "../../../../redux/hooks";
import {
  selectItemName,
  selectItemNumber,
  selectItemSrc,
} from "../../../../redux/selectors";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/tsHelpers";
import ShareIconNode from "./ShareIconNode";

type Props = {
  reset: () => void;
};

const shareFunc = async (content: ShareContent) => {
  try {
    const response = await Share.share(content);
    return response;
  } catch (err) {
    if (err instanceof Error) return err.message;
    console.log("Unexpected Error", err);
  }
  return null;
};

const ShareButton: FC<Props> = ({ reset }) => {
  const itemId = useItemId();
  const itemName = useAppSelector(state => selectItemName(state, itemId));
  const itemNumber = useAppSelector(state => selectItemNumber(state, itemId));
  const src = useAppSelector(state => selectItemSrc(state, itemId));

  const shareContent = useMemo<ShareContent>(
    () => ({
      title: itemNumber,
      message: itemName,
      url: src,
    }),
    [itemNumber, itemName, src]
  );

  const shareInfo = useCallback<OnPress>(() => {
    reset();
    shareFunc(shareContent);
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
