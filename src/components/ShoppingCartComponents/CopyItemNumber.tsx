import { FC, memo } from "react";
import { Fontisto } from "@expo/vector-icons";
import { itemInterface } from "../../redux/addedSlice";
import * as Clipboard from "expo-clipboard";

interface Props {
  itemObj: itemInterface;
}

const CopyItemNumber: FC<Props> = ({ itemObj }): JSX.Element => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(itemObj.itemNumber);
  };
  return (
    <>
      <Fontisto
        onPress={copyToClipboard}
        name="copy"
        size={30}
        color="black"
        style={{ marginStart: 10 }}
      />
    </>
  );
};

export default memo(CopyItemNumber);