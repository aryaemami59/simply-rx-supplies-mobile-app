import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { TouchableHighlight } from "react-native";
import {
  officialVendorNameType,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import {
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
  selectVendorsChecked,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { WIDTH_100 } from "../../../../shared/sharedStyles";

type Props = {
  title: officialVendorNameType;
  vendorName: vendorNameType;
};

const BottomSheetVendorCheckbox: FC<Props> = ({
  title,
  vendorName,
}): JSX.Element => {
  const checked = useAppSelector(selectVendorsChecked(vendorName));
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const onToggleCheck = useCallback(() => {
    checked
      ? dispatch(setVendorsForAllUncheck(vendorName))
      : dispatch(setVendorsForAllCheck(vendorName));
  }, [checked, dispatch, vendorName]);

  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={onToggleCheck}
      activeOpacity={0.6}>
      <ListItem
        bottomDivider
        containerStyle={[{ backgroundColor: theme.colors.background }]}>
        <ListItem.Content style={WIDTH_100}>
          <ListItem.CheckBox
            checked={checked}
            title={title}
            onPress={onToggleCheck}
          />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableHighlight>
  );
};

export default memo<Props>(BottomSheetVendorCheckbox);
