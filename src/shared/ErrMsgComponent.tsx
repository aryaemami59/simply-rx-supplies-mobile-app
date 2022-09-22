import { FC, memo } from "react";
import { View, Text } from "react-native";

const ErrMsgComponent: FC = (): JSX.Element => {
  return (
    <View>
      <Text style={{ color: "red", fontSize: 40 }}>
        Oh snap! You got an error!
      </Text>
      <Text style={{ color: "red", fontSize: 28 }}>
        Looks like there was a problem loading the page. Either refresh the page
        or try again later.
      </Text>
    </View>
  );
};

export default memo(ErrMsgComponent);
