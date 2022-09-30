import { FC, memo } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

const ShareIcon: FC = (): JSX.Element => {
  return (
    <>
      <EvilIcons
        name={Platform.OS === "ios" ? "share-apple" : "share-google"}
        color="white"
        size={24}
      />
    </>
  );
};

export default memo(ShareIcon);
