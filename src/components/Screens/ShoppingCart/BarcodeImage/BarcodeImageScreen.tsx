import { Octicons } from "@expo/vector-icons";
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useEffect, useMemo } from "react";
import {
  Image,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ShoppingCartStackParamList } from "../../../../../CustomTypes/types";
import {
  BARCODE_ASPECT_RATIO,
  JC_AI_CENTER_HEIGHT100,
  WIDTH_90,
} from "../../../../shared/sharedStyles";

const iconName = Platform.OS === "android" ? "share-android" : "share";

type Props = NativeStackScreenProps<ShoppingCartStackParamList, "BarcodeImage">;

const BarcodeImageScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { src, name } = route.params;

  const options: NativeStackNavigationOptions = useMemo(() => {
    return {
      title: name,
    };
  }, [name]);

  const shareContent = useMemo(() => {
    return {
      title: `Barcode Image for ${name}`,
      message: `This is the barcode image for ${name}`,
      url: src,
    };
  }, [name, src]);

  const imageSource = useMemo(() => {
    return {
      uri: src,
    };
  }, [src]);

  const shareBarcode = useCallback(() => {
    Share.share(shareContent);
  }, [shareContent]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const { theme } = useTheme();

  return (
    <View
      style={[
        JC_AI_CENTER_HEIGHT100,
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}>
      <TouchableOpacity onLongPress={shareBarcode}>
        <Image
          source={imageSource}
          style={[BARCODE_ASPECT_RATIO, WIDTH_90]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareBarcode}>
        <Octicons
          name={iconName}
          size={50}
          style={styles.icon}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
  },
  icon: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginEnd: 15,
  },
});

export default memo<Props>(BarcodeImageScreen);
