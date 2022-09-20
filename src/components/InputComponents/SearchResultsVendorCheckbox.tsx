import { ListItem } from "@rneui/themed";
import { FC, memo, useCallback } from "react";
import { TouchableHighlight } from "react-native";
import {
  officialVendorNameType,
  vendorNameType,
} from "../../../CustomTypes/types";
import {
  setVendorsForAllCheck,
  setVendorsForAllUncheck,
} from "../../redux/addedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectVendorsChecked } from "../../redux/addedSlice";

type Props = {
  title: officialVendorNameType;
  vendorName: vendorNameType;
};

const SearchResultsVendorCheckbox: FC<Props> = ({
  title,
  vendorName,
}): JSX.Element => {
  const checked: boolean = useAppSelector<boolean>(
    selectVendorsChecked(vendorName)
  );
  const dispatch = useAppDispatch();

  const onToggleCheck = useCallback(() => {
    checked
      ? dispatch(setVendorsForAllUncheck(vendorName))
      : dispatch(setVendorsForAllCheck(vendorName));
  }, [checked]);

  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={onToggleCheck}
      activeOpacity={0.6}>
      <ListItem bottomDivider>
        <ListItem.Content style={{ width: "100%" }}>
          <ListItem.CheckBox checked={checked} title={title} />
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableHighlight>
  );
};

export default memo<Props>(SearchResultsVendorCheckbox);
