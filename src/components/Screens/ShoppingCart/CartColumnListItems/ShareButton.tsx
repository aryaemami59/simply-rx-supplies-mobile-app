import { Button } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { ShareContent, TouchableWithoutFeedbackProps } from "react-native";
import { Share } from "react-native";

import useItemName from "../../../../hooks/useItemName";
import { useAppSelector } from "../../../../redux/hooks";
import { selectItemNumber, selectItemSrc } from "../../../../redux/selectors";
import { JC_SPACE_EVENLY } from "../../../../shared/styles/sharedStyles";
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
  const itemName = useItemName();
  const itemNumber = useAppSelector(selectItemNumber(itemName));
  const src = useAppSelector(selectItemSrc(itemName));

  const shareContent: ShareContent = useMemo(
    () => ({
      title: `${itemNumber}`,
      message: `${itemName}`,
      url: src,
    }),
    [itemNumber, itemName, src]
  );

  const shareInfo: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      reset();
      shareFunc(shareContent);
      // (async () => {
      //   try {
      //     const response = await Share.share(shareContent);
      //     return response;
      //   } catch (err) {
      //     if (err instanceof Error) return err.message;
      //     console.log("Unexpected Error", err);
      //   }
      //   return null;
      // })();
      // Share.share(shareContent).catch(e => console.log(e));
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
