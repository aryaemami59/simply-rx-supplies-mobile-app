import { FC, memo } from "react";
import { ActivityIndicator, View } from "react-native";
import { JC_AI_CENTER_HEIGHT100 } from "./sharedStyles";

const IsLoadingComponents: FC = (): JSX.Element => {
  return (
    <View style={JC_AI_CENTER_HEIGHT100}>
      <ActivityIndicator
        size="large"
        color="aqua"
      />
    </View>
  );
};

export default memo(IsLoadingComponents);
