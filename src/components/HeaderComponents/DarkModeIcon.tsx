import { Ionicons } from "@expo/vector-icons";
import { useThemeMode } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback } from "react";
import { TouchableHighlight } from "react-native";

const DarkModeIcon: FC = () => {
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
