import { FC, memo, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ShoppingCartStackParamList } from "../../../../../../CustomTypes/types";
import { Image, ListItem, Text, useTheme } from "@rneui/themed";
import {
  AI_FLEX_START,
  TEXT_CENTER,
  JC_SPACE_BETWEEN,
} from "../../../../../shared/sharedStyles";
import { AI_CENTER, WIDTH_60 } from "../../../../../shared/sharedStyles";
import { BARCODE_ASPECT_RATIO } from "../../../../../shared/sharedStyles";
import { HEIGHT_100 } from "../../../../../shared/sharedStyles";
import { TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../../../redux/hooks";
import { selectVendorsOfficialNames } from "../../../../../redux/addedSlice";
import {
  selectVendorOfficialName,
  selectAllVendorOfficialNames,
} from "../../../../../redux/addedSlice";

type Props = NativeStackScreenProps<ShoppingCartStackParamList, "ItemDetails">;

const ItemDetailsScreen: FC<Props> = ({ navigation, route }): JSX.Element => {
  const { itemObj, vendorName } = route.params;
  const { src, name, vendors } = itemObj;
  const { theme } = useTheme();

  const officialVendorNames = useAppSelector(
    selectVendorsOfficialNames(vendors)
  );

  const clickHandler = useCallback(() => {
    navigation.navigate("BarcodeImage", {
      src,
      name,
    });
  }, [name, navigation, src]);

  return (
    <>
      <ListItem
        containerStyle={[
          HEIGHT_100,
          AI_FLEX_START,
          JC_SPACE_BETWEEN,
          { backgroundColor: theme.colors.background },
        ]}>
        <ListItem.Content style={[AI_CENTER]}>
          <Text h2 style={[TEXT_CENTER]}>
            {name}
          </Text>
          {/* <Text h3 style={[TEXT_CENTER]}>
            {itemObj.itemNumber}
          </Text> */}
          <TouchableOpacity onPress={clickHandler}>
            <Image
              source={{ uri: src }}
              containerStyle={[BARCODE_ASPECT_RATIO, WIDTH_60]}
            />
          </TouchableOpacity>
          <Text h3 style={[TEXT_CENTER]}>
            Available on:
          </Text>
          {officialVendorNames.map(officialName => (
            <Text key={officialName} h4>
              {officialName}
            </Text>
          ))}
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default memo<Props>(ItemDetailsScreen);
