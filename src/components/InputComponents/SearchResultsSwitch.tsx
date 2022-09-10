import { FC, memo } from "react";
import { useAppSelector, RootState, AppDispatch } from "../../redux/store";
import {
  selectVendorOfficialName,
  setVendors,
  itemInterface,
} from "../../redux/addedSlice";
import { Card } from "@rneui/themed";
import { connect, ConnectedProps } from "react-redux";
// import { Switch } from "react-native-switch";
import { View, Text, Switch } from "react-native";

type stateToPropsReturnType = {
  checked: boolean;
  disabled: boolean;
};

const mapStateToProps = (
  state: RootState,
  ownProps: ParentProps
): stateToPropsReturnType => {
  return {
    checked: state.item[ownProps.itemObj.name].vendorsToAdd.includes(
      ownProps.vendorName
    ),
    disabled: state.item[ownProps.itemObj.name].vendorsAdded.includes(
      ownProps.vendorName
    ),
  };
};

const mapDispatchToProps = (
  dispatch: AppDispatch,
  ownProps: ParentProps
): { clickHandler: () => void } => {
  return {
    clickHandler: () => {
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
  vendorName: string;
  itemObj: itemInterface;
}

type myProps = ParentProps & PropsFromRedux;

const SearchResultsSwitch: FC<myProps> = ({
  checked,
  itemObj,
  vendorName,
  disabled,
  clickHandler,
}): JSX.Element => {
  const officialVendorName = useAppSelector(
    selectVendorOfficialName(vendorName)
  );

  // const clickHandler = useCallback(() => {
  //   setChecked(prev => !prev);
  // }, []);

  return (
    <>
      <Card.FeaturedTitle
        style={{ color: "black", textAlign: "center", flexDirection: "row" }}>
        <View
          style={{
            margin: 10,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Switch
            style={{
              margin: 10,
              transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
            }}
            value={checked}
            onValueChange={clickHandler}
            // activeText={"On"}
            // inActiveText={"Off"}
            // switchLeftPx={8}
            // switchRightPx={8}
          />
          <Text>{officialVendorName}</Text>
        </View>
      </Card.FeaturedTitle>
    </>
  );
};

export default connector(memo<myProps>(SearchResultsSwitch));
