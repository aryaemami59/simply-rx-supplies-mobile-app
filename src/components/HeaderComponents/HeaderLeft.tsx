import { FC, memo } from "react";
import { TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

interface Props {
  navigation: string;
}

const HeaderLeft = ({ navigation }): JSX.Element => {
  return (
    <>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <SimpleLineIcons
          name="menu"
          color="white"
          size={30}
          style={{ marginStart: 20 }}
        />
      </TouchableOpacity>
    </>
  );
};

export default memo(HeaderLeft);
