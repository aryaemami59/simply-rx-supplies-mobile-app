import { FC, memo, useCallback } from "react";
import { TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeMode } from "@rneui/themed";
import { HeaderIcon } from "@rneui/base/dist/Header/components/HeaderIcon";

type Props = {
  props: string;
};

const DarkModeIcon: FC = (): JSX.Element => {
  const { mode, setMode } = useThemeMode();

  const toggleTheme = useCallback(() => {
    setMode(mode === "dark" ? "light" : "dark");
  }, [mode, setMode]);

  return (
    <TouchableHighlight underlayColor="gray">
      <Ionicons
        name={mode === "light" ? "moon-outline" : "sunny-outline"}
        color="white"
        size={28}
        onPress={toggleTheme}
      />
    </TouchableHighlight>
  );
};

export default memo(DarkModeIcon);

