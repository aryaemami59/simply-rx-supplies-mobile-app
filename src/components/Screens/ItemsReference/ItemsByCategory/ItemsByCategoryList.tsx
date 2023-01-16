import { useNavigation } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import TouchableScale from "react-native-touchable-scale";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
} from "../../../../shared/styles/sharedStyles";
import type { Category } from "../../../../types/api";
import type { ItemsByCategoryScreenProps } from "../../../../types/navigation";
import { itemsByCategoryListItems } from "../../../../types/navigation";

type Props = {
  category: Category;
};

const ItemsByCategoryList: FC<Props> = ({ category }) => {
  const navigation = useNavigation<ItemsByCategoryScreenProps["navigation"]>();
  const { background } = useTheme().theme.colors;

  const clickHandler: NonNullable<PressableProps["onPress"]> =
    useCallback(() => {
      navigation.push(itemsByCategoryListItems, { category });
    }, [navigation, category]);

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => [AI_CENTER, JC_SPACE_BETWEEN, { backgroundColor: background }],
    [background]
  );

  return (
    <ListItem
      containerStyle={containerStyle}
      bottomDivider
      Component={TouchableScale}
      onPress={clickHandler}>
      <ListItem.Content>
        <ListItem.Title>{category}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(ItemsByCategoryList);
