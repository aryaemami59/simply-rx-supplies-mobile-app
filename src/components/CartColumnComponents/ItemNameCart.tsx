import { FC, memo } from "react";
import { View, Text } from "react-native";
import * as Clipboard from "expo-clipboard";
import { itemInterface } from "../../redux/addedSlice";
import { Fontisto } from "@expo/vector-icons";

interface Props {
  itemObj: itemInterface;
}

const ItemNameCart: FC<Props> = ({ itemObj }): JSX.Element => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(itemObj.name);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ textAlign: "center" }}>Item Name: {itemObj.name}</Text>
      <Fontisto
        onPress={copyToClipboard}
        name="copy"
        size={30}
        color="black"
        style={{ marginStart: 10 }}
      />
    </View>
  );
};

export default memo(ItemNameCart);
