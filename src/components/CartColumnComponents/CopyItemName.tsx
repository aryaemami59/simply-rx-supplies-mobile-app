import { FC, memo } from "react";
import { Fontisto } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { itemInterface } from "../../redux/addedSlice";

interface Props {
  itemObj: itemInterface;
}

const CopyItemName: FC<Props> = ({ itemObj }): JSX.Element => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(itemObj.name);
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

export default memo(CopyItemName);
