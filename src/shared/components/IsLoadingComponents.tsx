import type { FC } from "react";
import { memo } from "react";
import { ActivityIndicator, View } from "react-native";

import { JC_AI_CENTER_HEIGHT100 } from "../styles/sharedStyles";

const IsLoadingComponents: FC = () => (
  <View style={JC_AI_CENTER_HEIGHT100}>
    <ActivityIndicator
      size="large"
      color="aqua"
    />
  </View>
);

export default memo(IsLoadingComponents);
