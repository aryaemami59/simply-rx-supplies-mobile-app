import { Octicons } from "@expo/vector-icons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
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
import { BarcodeImageScreenProps } from "../../../../../CustomTypes/navigation";
import {
  BARCODE_ASPECT_RATIO,
  JC_AI_CENTER_HEIGHT100,
  WIDTH_90,
} from "../../../../shared/sharedStyles";

const iconName = Platform.OS === "android" ? "share-android" : "share";

type Props = BarcodeImageScreenProps;

const style = [BARCODE_ASPECT_RATIO, WIDTH_90];

const BarcodeImageScreen: FC<Props> = ({ navigation, route }) => {
  const { background } = useTheme().theme.colors;
  const { src, itemName } = route.params;

  const options: Pick<NativeStackNavigationOptions, "title"> = useMemo(
    () => ({
      title: itemName,
    }),
    [itemName]
  );

  const shareContent = useMemo(
    () => ({
      title: `Barcode Image for ${itemName}`,
      message: `This is the barcode image for ${itemName}`,
      url: src,
    }),
    [itemName, src]
  );

  const imageSource = useMemo(
    () => ({
      uri: src,
    }),
    [src]
  );

  const shareBarcode = useCallback(() => {
    Share.share(shareContent);
  }, [shareContent]);

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);

  const viewStyle = useMemo(
    () => [
      JC_AI_CENTER_HEIGHT100,
      styles.container,
      { backgroundColor: background },
    ],
    [background]
  );

  return (
    <View style={viewStyle}>
      <TouchableOpacity onLongPress={shareBarcode}>
        <Image
          source={imageSource}
          style={style}
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
    marginEnd: 15,
    marginTop: 20,
  },
});

export default memo<Props>(BarcodeImageScreen);
