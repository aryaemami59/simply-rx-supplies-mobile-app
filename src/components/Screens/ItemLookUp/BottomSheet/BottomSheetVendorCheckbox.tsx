import { ListItem, useTheme } from "@rneui/themed";
import type { FC } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { TouchableHighlight } from "react-native";

import {
  checkOneVendorForAllSearchResults,
  unCheckOneVendorForAllSearchResults,
} from "../../../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectOfficialName } from "../../../../redux/selectors";
import { WIDTH_100 } from "../../../../shared/styles/sharedStyles";
import type { OnPress } from "../../../../types/tsHelpers";

type Props = {
  vendorId: number;
};

const BottomSheetVendorCheckbox: FC<Props> = ({ vendorId }) => {
  const officialVendorName = useAppSelector(state =>
    selectOfficialName(state, vendorId)
  );
  const [checked, setChecked] = useState(true);
  const dispatch = useAppDispatch();
  const { background } = useTheme().theme.colors;

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({ backgroundColor: background }),
    [background]
  );

  const onToggleCheck: OnPress = useCallback(() => {
    if (checked) {
      dispatch(checkOneVendorForAllSearchResults({ vendorId }));
    } else {
      dispatch(unCheckOneVendorForAllSearchResults({ vendorId }));
    }
    setChecked(prev => !prev);
  }, [checked, dispatch, vendorId]);

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
            title={officialVendorName}
            onPress={onToggleCheck}
          />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableHighlight>
  );
};

export default memo<Props>(BottomSheetVendorCheckbox);
