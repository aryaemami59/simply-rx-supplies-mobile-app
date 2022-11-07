import { ListItem, useTheme } from "@rneui/themed";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { TouchableHighlight } from "react-native";
import {
  OfficialVendorNameType,
  VendorNameType,
} from "../../../../../custom_types/api";
import {
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
} from "../../../../redux/addedSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { WIDTH_100 } from "../../../../shared/styles/sharedStyles";

type Props = {
  title: OfficialVendorNameType;
  vendorName: VendorNameType;
};

const BottomSheetVendorCheckbox: FC<Props> = ({ title, vendorName }) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useAppDispatch();
  const { background } = useTheme().theme.colors;

  const containerStyle = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  const onToggleCheck = useCallback(() => {
    checked
      ? dispatch(setVendorsForAllUncheck(vendorName))
      : dispatch(setVendorsForAllCheck(vendorName));
    setChecked(prev => !prev);
  }, [checked, dispatch, vendorName]);

  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={onToggleCheck}
      activeOpacity={0.6}>
      <ListItem
        bottomDivider
        containerStyle={containerStyle}>
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
