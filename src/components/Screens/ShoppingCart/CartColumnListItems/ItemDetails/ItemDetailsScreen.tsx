import { Image, ListItem, Text, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { ImageURISource, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native";

import { useAppSelector } from "../../../../../redux/hooks";
import {
  selectItemSrc,
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
import type { OnPress } from "../../../../../types/tsHelpers";

type Props = ShoppingCartStackScreenProps<"ItemDetails">;

const imageContainerStyle: StyleProp<ViewStyle> = [
  BARCODE_ASPECT_RATIO,
  WIDTH_60,
];

const ItemDetailsScreen: FC<Props> = ({ navigation, route }) => {
  const { itemId } = route.params;
  const src = useAppSelector(state => selectItemSrc(state, itemId));
  const { background: backgroundColor } = useTheme().theme.colors;

  const officialVendorNames = useAppSelector(state =>
    selectVendorsOfficialNames(state, itemId)
  );

  const clickHandler = useCallback<OnPress>(() => {
    navigation.navigate(barcodeImage, {
      src,
      itemId,
    });
  }, [itemId, navigation, src]);

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [HEIGHT_100, AI_FLEX_START, JC_SPACE_BETWEEN, { backgroundColor }],
    [backgroundColor]
  );

  const source = useMemo<ImageURISource>(() => ({ uri: src }), [src]);

  return (
    <ListItem containerStyle={containerStyle}>
      <ListItem.Content style={AI_CENTER}>
        <Text
          h2
          style={TEXT_CENTER}>
          {itemId}
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
