import { ListItem } from "@rneui/themed";
import { FC, memo } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../../../CustomTypes/types";
import {
  selectVendorOfficialName,
  setVendors,
} from "../../../../redux/addedSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { BACKGROUND_TRANSPARENT } from "../../../../shared/sharedStyles";

type stateToPropsReturnType = {
  checked: boolean;
  disabled: boolean;
};

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): stateToPropsReturnType => {
  return {
    checked: state.item[ownProps.itemObj.name]!.vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name]!.vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: ParentProps
): { onToggleSwitch: () => void } => {
  return {
    onToggleSwitch: () => {
      dispatch(
        setVendors({
          itemObj: ownProps.itemObj,
          vendorName: ownProps.vendorName,
        })
      );
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ParentProps {
  vendorName: vendorNameType;
  itemObj: ItemObjType;
}

type myProps = ParentProps & PropsFromRedux;

const SearchResultsCheckBox: FC<myProps> = ({
  checked,
  vendorName,
  disabled,
  onToggleSwitch,
}): JSX.Element => {
  const officialVendorName = useAppSelector<officialVendorNameType>(
    selectVendorOfficialName(vendorName)
  );

  return (
    <ListItem.CheckBox
      checked={checked}
      disabled={disabled}
      onPress={onToggleSwitch}
      title={officialVendorName}
      style={BACKGROUND_TRANSPARENT}
      textStyle={BACKGROUND_TRANSPARENT}
    />
  );
};

export default connector(memo<myProps>(SearchResultsCheckBox));
