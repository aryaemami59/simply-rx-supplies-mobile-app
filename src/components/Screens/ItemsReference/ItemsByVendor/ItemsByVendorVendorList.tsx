import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import TouchableScale from "react-native-touchable-scale";
import {
  ItemsReferenceStackParamList,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import { selectVendorOfficialName } from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { AI_CENTER, JC_SPACE_BETWEEN } from "../../../../shared/sharedStyles";

type Props = {
  vendorName: vendorNameType;
};

const ItemsByVendorVendorList: FC<Props> = ({ vendorName }): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );
  const { theme } = useTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<ItemsReferenceStackParamList>>();

  const clickHandler = useCallback(() => {
    navigation.push("ItemsByVendorListItems", { vendorName });
  }, [navigation, vendorName]);

  return (
    <ListItem
      containerStyle={[
        AI_CENTER,
        JC_SPACE_BETWEEN,
        { backgroundColor: theme.colors.background },
      ]}
      bottomDivider
      Component={TouchableScale}
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{officialVendorName}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(ItemsByVendorVendorList);
