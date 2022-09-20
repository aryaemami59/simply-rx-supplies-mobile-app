import { Card, CheckBox } from "@rneui/themed";
import { FC, memo, useState } from "react";
import { View, Text } from "react-native";
import {
  selectVendorsArr,
  selectAllVendorOfficialNames,
} from "../../redux/addedSlice";
import AddItemButton from "./AddItemButton";
import BarcodeImageSearchResults from "./BarcodeImageSearchResults";
import SearchResultsSwitch from "./SearchResultsSwitch";
import ImagedCardView from "react-native-imaged-card-view";
// import CardContainer from 'react-native-imaged-card-view';
import { useAppSelector } from "../../redux/store";
import SearchResultsVendorCheckbox from "./SearchResultsVendorCheckbox";
import {
  ItemObjType,
  officialVendorNameType,
  vendorNameType,
} from "../../../CustomTypes/types";

type Props = {
  item: ItemObjType;
};

const SingleInputListItem: FC<Props> = ({ item }): JSX.Element => {
  const vendors = useAppSelector<vendorNameType[]>(selectVendorsArr);
  const officialVendorNames = useAppSelector<officialVendorNameType[]>(
    selectAllVendorOfficialNames
  );

  const [checked, setChecked] = useState<boolean>(true);

  return (
    <View key={item.id}>
      {/* <ImagedCardView
        stars={5}
        reviews={456}
        ratings={4.5}
        title="Yosemite"
        rightSideValue="$990"
        subtitle="California"
        leftSideValue="3 Days"
        backgroundColor="#ff6460"
        source={{
          uri: item.src,
        }}
      /> */}
      {/* <Text style={{ textAlign: "center", fontSize: 20 }}>
        Uncheck to exclude vendors
      </Text> */}
      {/* <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
        {officialVendorNames.map((e: officialVendorNameType, i: number) => (
          <SearchResultsVendorCheckbox
            key={e}
            title={e}
            vendorName={vendors[i]}
          />
        ))}
      </View> */}
      <Card>
        <Card.Title style={{ fontSize: 20 }}>{item.name}</Card.Title>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {item.vendors.map((e: vendorNameType) => (
            <SearchResultsSwitch key={e} vendorName={e} itemObj={item} />
          ))}
        </View>
        {/* <View style={{ alignItems: "center" }}>
          <BarcodeImageSearchResults itemObj={item} />
        </View> */}
        {/* <Card.FeaturedSubtitle style={{ color: "black", textAlign: "center" }}>
          Item Number: {item.itemNumber}
        </Card.FeaturedSubtitle> */}
        <Card.Divider />
        <AddItemButton itemObj={item} />
      </Card>
    </View>
  );
};

export default memo(SingleInputListItem);
