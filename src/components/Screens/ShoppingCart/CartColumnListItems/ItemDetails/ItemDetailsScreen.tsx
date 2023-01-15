import { Image, ListItem, Text, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type {
  ImageURISource,
  StyleProp,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../../../redux/hooks";
import {
  selectItemSrc,
  selectVendorsByItemName,
  selectVendorsOfficialNames,
} from "../../../../../redux/selectors";
import {
  AI_CENTER,
  AI_FLEX_START,
  BARCODE_ASPECT_RATIO,
  HEIGHT_100,
  JC_SPACE_BETWEEN,
  TEXT_CENTER,
  WIDTH_60,
} from "../../../../../shared/styles/sharedStyles";
import type { ShoppingCartStackScreenProps } from "../../../../../types/navigation";
import { barcodeImage } from "../../../../../types/navigation";

type Props = ShoppingCartStackScreenProps<"ItemDetails">;
// type Props = ItemDetailsScreenProps;

const imageContainerStyle: StyleProp<ViewStyle> = [
  BARCODE_ASPECT_RATIO,
  WIDTH_60,
];

const ItemDetailsScreen: FC<Props> = ({ navigation, route }) => {
  const { itemName } = route.params;
  const vendors = useAppSelector(
    selectVendorsByItemName(itemName),
    shallowEqual
  );
  const src = useAppSelector(selectItemSrc(itemName));
  const { background: backgroundColor } = useTheme().theme.colors;

  const officialVendorNames = useAppSelector(
    selectVendorsOfficialNames(vendors),
    shallowEqual
  );

  const clickHandler: NonNullable<TouchableWithoutFeedbackProps["onPress"]> =
    useCallback(() => {
      navigation.navigate(barcodeImage, {
        src,
        itemName,
      });
    }, [itemName, navigation, src]);

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [HEIGHT_100, AI_FLEX_START, JC_SPACE_BETWEEN, { backgroundColor }],
    [backgroundColor]
  );

  const source: ImageURISource = useMemo(() => ({ uri: src }), [src]);

  return (
    <ListItem containerStyle={containerStyle}>
      <ListItem.Content style={AI_CENTER}>
        <Text
          h2
          style={TEXT_CENTER}>
          {itemName}
        </Text>
        <TouchableOpacity onPress={clickHandler}>
          <Image
            source={source}
            containerStyle={imageContainerStyle}
          />
        </TouchableOpacity>
        <Text
          h3
          style={TEXT_CENTER}>
          Available on:
        </Text>
        {officialVendorNames.map(officialName => (
          <Text
            key={officialName}
            h4>
            {officialName}
          </Text>
        ))}
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(ItemDetailsScreen);
