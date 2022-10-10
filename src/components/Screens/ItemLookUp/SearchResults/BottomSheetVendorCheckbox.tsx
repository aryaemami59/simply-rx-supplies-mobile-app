import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useState } from "react";
import { TouchableHighlight } from "react-native";
import {
  officialVendorNameType,
  VendorNameType,
} from "../../../../../CustomTypes/types";
import {
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
} from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { WIDTH_100 } from "../../../../shared/sharedStyles";

type Props = {
  title: officialVendorNameType;
  vendorName: VendorNameType;
};

const BottomSheetVendorCheckbox: FC<Props> = ({ title, vendorName }) => {
  // const checked = useAppSelector(selectVendorsChecked(vendorName));
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const onToggleCheck = useCallback(() => {
    checked
      ? dispatch(setVendorsForAllUncheck({ vendorName }))
      : dispatch(setVendorsForAllCheck({ vendorName }));
    setChecked(prev => !prev);
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
