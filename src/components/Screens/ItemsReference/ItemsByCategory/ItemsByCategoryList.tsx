import { useNavigation } from "@react-navigation/native";
import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import TouchableScale from "react-native-touchable-scale";

import { useAppSelector } from "../../../../redux/hooks";
import { selectCategoryName } from "../../../../redux/selectors";
import {
  AI_CENTER,
  JC_SPACE_BETWEEN,
} from "../../../../shared/styles/sharedStyles";
import type { ItemsReferenceTabScreenProps } from "../../../../types/navigation";
import { itemsByCategoryListItems } from "../../../../types/navigation";

type Props = {
  categoryId: number;
};

const ItemsByCategoryList: FC<Props> = ({ categoryId }) => {
  const navigation =
    useNavigation<
      ItemsReferenceTabScreenProps<"ItemsByCategory">["navigation"]
    >();
  const { background } = useTheme().theme.colors;

  const categoryName = useAppSelector(state =>
    selectCategoryName(state, categoryId)
  );

  const clickHandler = useCallback<
    NonNullable<PressableProps["onPress"]>
  >(() => {
    navigation.push(itemsByCategoryListItems, { categoryId });
  }, [navigation, categoryId]);

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
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
        <ListItem.Title>{categoryName}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

export default memo<Props>(ItemsByCategoryList);
