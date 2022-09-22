import { FC, memo } from "react";
import { useAppSelector, RootState, AppDispatch } from "../../redux/store";
import { selectVendorOfficialName, setVendors } from "../../redux/addedSlice";
import { Card, ListItem } from "@rneui/themed";
import { connect, ConnectedProps } from "react-redux";
// import { Switch } from "react-native-switch";
import { View, Text } from "react-native";
// import { Switch } from "react-native";
import { Switch } from "react-native-paper";
import { mainColor } from "../../shared/sharedStyles";
import { ItemObjType, vendorNameType } from "../../../CustomTypes/types";

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

const SearchResultsSwitch: FC<myProps> = ({
  checked,
  itemObj,
  vendorName,
  disabled,
  onToggleSwitch,
}): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  return (
    <>
      <ListItem.CheckBox
        checked={checked}
        disabled={disabled}
        onPress={onToggleSwitch}
        title={officialVendorName}
      />
      {/* <Card.FeaturedTitle
        style={{ color: "black", textAlign: "center", flexDirection: "row" }}>
        <View
          style={{
            margin: 10,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}> */}
      {/* <Switch
        disabled={disabled}
        value={checked}
        onValueChange={onToggleSwitch}
        color={mainColor}
      />
      <Text>{officialVendorName}</Text> */}
      {/* </View>
      </Card.FeaturedTitle> */}
    </>
  );
};

export default connector(memo<myProps>(SearchResultsSwitch));
