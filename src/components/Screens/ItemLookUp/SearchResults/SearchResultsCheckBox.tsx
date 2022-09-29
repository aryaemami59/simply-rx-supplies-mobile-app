import { FC, memo } from "react";
import { RootState, AppDispatch } from "../../../../redux/store";
import {
  selectVendorOfficialName,
  setVendors,
} from "../../../../redux/addedSlice";
import { ListItem } from "@rneui/themed";
import { connect, ConnectedProps } from "react-redux";
import { useAppSelector } from "../../../../redux/hooks";
import {
  ItemObjType,
  vendorNameType,
  officialVendorNameType,
} from "../../../../../CustomTypes/types";

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
      style={{ backgroundColor: "transparent" }}
      textStyle={{ backgroundColor: "transparent" }}
    />
  );
};

export default connector(memo<myProps>(SearchResultsCheckBox));
