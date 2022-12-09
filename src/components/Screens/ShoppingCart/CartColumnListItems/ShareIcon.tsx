import { EvilIcons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo } from "react";
import { Platform } from "react-native";

const name = Platform.OS === "ios" ? "share-apple" : "share-google";

const ShareIcon: FC = () => (
  <EvilIcons
    name={name}
    color="white"
    size={24}
  />
);

export default memo(ShareIcon);
