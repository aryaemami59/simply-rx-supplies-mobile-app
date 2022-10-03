import { EvilIcons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { Platform } from "react-native";

const name = Platform.OS === "ios" ? "share-apple" : "share-google";

const ShareIcon: FC = (): JSX.Element => {
  return (
    <EvilIcons
      name={name}
      color="white"
      size={24}
    />
  );
};

export default memo(ShareIcon);
