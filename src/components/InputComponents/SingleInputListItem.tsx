import { Button, Card, CheckBox, ListItem } from "@rneui/themed";
import { FC, memo, useState, useCallback } from "react";
import { View, Text } from "react-native";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
  checkIfAddedToAllVendors,
  addItems,
} from "../../redux/addedSlice";
import AddItemButton from "./AddItemButton";
import BarcodeImageSearchResults from "./BarcodeImageSearchResults";
import SearchResultsSwitch from "./SearchResultsSwitch";
import ImagedCardView from "react-native-imaged-card-view";
// import CardContainer from 'react-native-imaged-card-view';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { ItemObjType, vendorNameType } from "../../../CustomTypes/types";
import { selectVendorsToAddTo } from "../../redux/addedSlice";
import { shallowEqual } from "react-redux";

type Props = {
  item: ItemObjType;
};

const SingleInputListItem: FC<Props> = ({ item: itemObj }): JSX.Element => {
  const vendors: vendorNameType[] = useAppSelector<vendorNameType[]>(
    selectVendorsToAddTo(itemObj),
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const IfAddedToAllVendors: boolean = useAppSelector<boolean>(
    checkIfAddedToAllVendors(itemObj)
  );
  const clickHandler = useCallback((): void => {
    // Keyboard.dismiss();
    IfAddedToAllVendors;
    // ? showThenHide()
    dispatch(addItems({ itemObj, vendors }));
  }, [IfAddedToAllVendors, dispatch, itemObj, vendors]);

  return (
    <View key={itemObj.id}>
      <ListItem
        bottomDivider
        // onSwipeEnd={clickHandler}
        // rightContent={<Button title="Add" color="success" />}
      >
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "600" }}>
            {itemObj.name}
          </ListItem.Title>
          {/* <ListItem.Subtitle> */}
          {itemObj.vendors.map((e: vendorNameType) => (
            <SearchResultsSwitch key={e} vendorName={e} itemObj={itemObj} />
          ))}
          {/* </ListItem.Subtitle> */}
        </ListItem.Content>
        <ListItem.Content right>
          {/* <Button title="Add" /> */}
          <AddItemButton itemObj={itemObj} />
        </ListItem.Content>
        {/* <ListItem.Chevron /> */}
      </ListItem>
      {/* <Card>
        <Card.Title style={{ fontSize: 20 }}>{item.name}</Card.Title>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {item.vendors.map((e: vendorNameType) => (
            <SearchResultsSwitch key={e} vendorName={e} itemObj={item} />
          ))}
        </View>
        <Card.Divider />
        <AddItemButton itemObj={item} />
      </Card> */}
    </View>
  );
};

export default memo(SingleInputListItem);
